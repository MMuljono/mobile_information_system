import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";
import UserContext from "../context/userContext";
import { API_URL } from "react-native-dotenv";
import { EventData, RootTabScreenProps } from "../types";

const defaultValues = {
  region: {
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.15,
    longitudeDelta: 0.1,
  },
};

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [markers, setMarkers] = useState<EventData[]>([]);
  const { user } = useContext(UserContext);
  const [showDesc, setShowDesc] = useState<EventData>();
  const handleRedirectUserScreen = (text: string) => () => {
    if (text === "Login") {
      return navigation.navigate("Profile", {
        login: true,
      });
    } else {
      return navigation.navigate("Profile", {
        login: false,
      });
    }
  };

  const showDetailEvent = (e: EventData) => {
    setShowDesc(e);
  };

  const handleJoinEvent = async () => {
    if (showDesc && Object.keys(showDesc).length > 0) {
      const fetchURL = `${API_URL}/event/join/${showDesc.id}`;
      const data = await fetch(fetchURL, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      });
      const response = await data.json();
      console.log("response", response);
    }
  };

  useEffect(() => {
    const fetchURL = `${API_URL}/event`;
    fetch(fetchURL, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(async (response) => {
        setMarkers(response);
      })
      .catch((res) => {
        res.json().then((json: any) => {
          console.log(json);
        });
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerSearchBox}>
        <View style={styles.searchBar__unclicked}>
          <Ionicons
            size={30}
            name="location-outline"
            style={{ marginLeft: 1 }}
          />
          <TextInput style={styles.input} placeholder="Search" />
          <FontAwesome size={25} name="search" style={{ marginRight: 1 }} />
        </View>
      </View>

      <MapView style={styles.map} initialRegion={defaultValues.region}>
        {markers.map((e: EventData) => {
          return (
            <Marker
              key={e.id}
              coordinate={{ longitude: e.longtitude, latitude: e.latitude }}
              onPress={() => showDetailEvent(e)}
            />
          );
        })}
      </MapView>
      {showDesc && Object.keys(showDesc).length > 0 ? (
        <View style={styles.containerText}>
          <View style={styles.containerTextButton}>
            <Text>Description: {showDesc.description} </Text>
            <Text>Location: {showDesc.address} </Text>
            <Text>
              PLZ: {showDesc.postcode} City: {showDesc.city}
            </Text>
            <Text>Contact: {showDesc.contactInfo}</Text>
          </View>
          <View style={styles.containerTextButton}>
            {user !== "" ? (
              <TouchableOpacity
                style={{
                  ...styles.buttonCreateEvent,
                  width: "100%",
                  height: "50%",
                  marginBottom: 5,
                }}
                onPress={() => handleJoinEvent()}
              >
                <Text>Join</Text>
              </TouchableOpacity>
            ) : undefined}
            <TouchableOpacity
              style={{
                ...styles.buttonCreateEvent,
                width: "100%",
                height: "50%",
              }}
              onPress={() => setShowDesc({} as EventData)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : undefined}

      <View style={styles.containerGenre}>
        <TouchableOpacity style={styles.genre2}>
          <Text>Sport</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre}>
          <Text>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre2}>
          <Text>Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.genre}>
          <Text>Art</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerText}>
        <View style={styles.containerTextButton}>
          <Text>Spannende Ideen ?</Text>
          <Text>Neugierig auf neue Leute?</Text>
          <Text>Starten Sie die Initiative</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonCreateEvent}
          onPress={() => navigation.navigate("Create")}
        >
          <Text>Event Erstellen</Text>
        </TouchableOpacity>
      </View>
      {user.length > 1 ? undefined : (
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={handleRedirectUserScreen("Login")}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignup}
            onPress={handleRedirectUserScreen("Register")}
          >
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.project.primary,
    backgroundColor: Colors.project.secondary,
    alignItems: "center",
  },
  containerSearchBox: {
    paddingTop: 70,
    margin: 15,
    marginLeft: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "99%",
    backgroundColor: Colors.project.light,
    borderRadius: 15,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "78%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: "95%",
    height: "25%",
    borderRadius: 15,
    borderColor: Colors.project.secondary,
    margin: 10,
  },
  containerGenre: {
    margin: 10,
    flexDirection: "row",
    width: "95%",
    height: "13%",
    backgroundColor: Colors.project.warm,
    borderRadius: 15,
    alignItems: "center",
  },
  containerText: {
    margin: 10,
    padding: 10,
    width: "95%",
    height: "15%",
    backgroundColor: Colors.project.warm,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButtons: {
    margin: 10,
    padding: 10,
    width: "95%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTextButton: {
    flexDirection: "column",
  },
  genre: {
    margin: 9,
    borderRadius: 25,
    height: "75%",
    width: "20%",
    backgroundColor: Colors.project.bright,
    alignItems: "center",
    justifyContent: "center",
  },
  genre2: {
    margin: 9,
    borderRadius: 25,
    height: "75%",
    width: "20%",
    backgroundColor: Colors.project.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonCreateEvent: {
    borderRadius: 25,
    marginLeft: 25,
    height: "60%",
    width: "35%",
    backgroundColor: Colors.project.bright,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogin: {
    borderRadius: 25,
    marginLeft: 25,
    height: "100%",
    width: "35%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignup: {
    borderRadius: 25,
    marginLeft: 25,
    height: "100%",
    width: "35%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
