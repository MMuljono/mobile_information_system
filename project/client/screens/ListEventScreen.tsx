import { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import UserContext from "../context/userContext";

import { FontAwesome } from "@expo/vector-icons";
import { API_URL } from "react-native-dotenv";
import { EventData } from "../types";
import Colors from "../constants/Colors";

export default function ListEventScreen() {
  const { user } = useContext(UserContext);
  const [showCreated, setShowCreated] = useState<boolean>(false);
  const [data, setData] = useState<EventData[]>([]);

  const handleFetch = async (url: string) => {
    const fetchURL = `${API_URL}/event/${url}`;
    const data = await fetch(fetchURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const jsonData = await data.json();
    if (url === "joined") {
      const eventData = jsonData.map(
        (list: { eventId: number; userId: number; event: JSON }) => list.event
      );
      setShowCreated(false);
      setData(eventData);
    } else if (url === "created") {
      setShowCreated(true);
      setData(jsonData);
    }
  };

  const handleParseTime = (time: string) => {
    const parsed = new Date(time);
    const hours = parsed.getHours();
    let minutes = parsed.getMinutes();
    if (minutes < 10) {
      minutes += 10;
    }
    const finalTime = `${hours}:${minutes}`;
    return finalTime;
  };

  const handleParseDate = (date: string) => {
    const dateParsed = new Date(date);
    const day = dateParsed.getDate();
    let month = dateParsed.getMonth() + 1;
    const year = dateParsed.getFullYear();
    const finalDate = `${day}.${month < 10 ? "0" + month : month}.${year}`;
    return finalDate;
  };

  const handleLeaveDeleteEvent = async (id: number) => {
    let fetchURL;
    if (showCreated) {
      fetchURL = `${API_URL}/event/delete/${id}`;
    } else {
      fetchURL = `${API_URL}/event/leave/${id}`;
    }
    const data = await fetch(fetchURL, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const jsonData = await data.json();
    console.log("response", jsonData);
  };

  useEffect(() => {
    handleFetch("created");
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonList}
            onPress={() => handleFetch("joined")}
          >
            <Text>Joined</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonList}
            onPress={() => handleFetch("created")}
          >
            <Text>Created</Text>
          </TouchableOpacity>
        </View>
        {user !== "" ? (
          <>
            <ScrollView>
              {data.length > 0
                ? data.map((list: EventData, index: number) => {
                    return (
                      <View
                        style={styles.containerText}
                        key={String(
                          list.id + list.contactInfo + list.description
                        )}
                      >
                        <View style={styles.containerLeftSide}>
                          <FontAwesome name="user-circle-o" size={70} />
                        </View>
                        <View style={styles.containerRightSide}>
                          <View style={styles.containerTime}>
                            <Text style={{ marginRight: 15 }}>
                              {handleParseDate(list.dateTime)}
                            </Text>
                            <Text
                              style={{ fontWeight: "bold", marginRight: 5 }}
                            >
                              {handleParseTime(list.dateTime)}
                            </Text>
                          </View>
                          <View style={styles.containerDescription}>
                            <Text>Description: (max {list.max})</Text>
                            <Text>{list.description}</Text>
                            <Text>Contact Info: {list.contactInfo}</Text>
                          </View>
                          <View style={styles.containerButtons}>
                            <TouchableOpacity
                              style={styles.buttonLogin}
                              onPress={() => handleLeaveDeleteEvent(list.id)}
                            >
                              <Text>{showCreated ? "Delete" : "Leave"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSignup}>
                              <Text>Contact</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })
                : undefined}
            </ScrollView>
          </>
        ) : (
          <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text>Please first login</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.project.primary,
    backgroundColor: Colors.project.secondary,
    paddingTop: 50,
  },
  containerList: {
    margin: 10,
    height: 800,
    width: "95%",
    flex: 1,
  },
  containerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerText: {
    margin: 10,
    padding: 10,
    width: "95%",
    backgroundColor: Colors.project.warm,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  containerLeftSide: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  containerColumn: {
    flexDirection: "column",
  },
  containerRightSide: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTime: {
    backgroundColor: Colors.project.light,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    flexDirection: "row",
    width: "75%",
    justifyContent: "center",
    flex: 1,
  },
  containerDescription: {
    backgroundColor: Colors.project.light,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    width: "78%",
    flex: 1,
  },
  containerButtons: {
    borderRadius: 15,
    flexDirection: "row",
    width: "50%",
    height: 35,
    justifyContent: "center",
    flex: 1,
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
  buttonList: {
    borderRadius: 6,
    height: "25%",
    borderWidth: 3,
    borderColor: Colors.project.warm,
    width: "50%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogin: {
    borderRadius: 15,
    height: "100%",
    width: "50%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSignup: {
    borderRadius: 15,
    marginLeft: 25,
    height: "100%",
    width: "70%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
