import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserContext from "../context/userContext";

import { FormEventInput } from "../types";
import Colors from "../constants/Colors";
import { API_URL } from "react-native-dotenv";

export default function AddEventScreen() {
  const { user } = useContext(UserContext);
  const { control, handleSubmit } = useForm<FormEventInput>({
    defaultValues: {
      max: "1",
      dateTime: new Date(),
      type: "",
      address: "",
      postcode: "12345",
      city: "",
      description: "",
      contactInfo: "",
    },
  });
  const onSubmit = async (data: FormEventInput) => {
    const { max, postcode, ...rest } = data;
    const fetchURL = `${API_URL}/event/create`;
    const formattedData = {
      max: Number(max),
      postcode: Number(postcode),
      ...rest,
    };
    const createEvent = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(formattedData),
    });
    const response = await createEvent.json();
    console.log("response", response);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInside}>
        <View style={styles.containerTop}>
          <MaterialCommunityIcons
            name="image-plus"
            size={120}
            color={Colors.project.light}
          />
          <View style={{ paddingLeft: 10, margin: 10 }}>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text>Max</Text>
              <View style={{ paddingRight: 5 }} />
              <Controller
                name="max"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Max"
                    onBlur={onBlur}
                    onChangeText={(value) =>
                      onChange(value.replace(/[^0-9]/g, ""))
                    }
                    ref={ref}
                    value={value}
                  />
                )}
              />
            </View>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text>Type</Text>
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Type"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    ref={ref}
                    value={value}
                  />
                )}
              />
            </View>
          </View>
        </View>
        <Text>Date & Time</Text>
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            paddingRight: 15,
          }}
        >
          <Controller
            name="dateTime"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePicker
                display="default"
                mode="datetime"
                locale="de"
                style={{
                  width: "80%",
                  backgroundColor: Colors.project.warm,
                }}
                value={value}
                onChange={(_: any, data: Date | undefined) => onChange(data)}
              />
            )}
          />
        </View>

        <Text>Location</Text>
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              placeholder="Location"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              ref={ref}
              value={value}
            />
          )}
        />
        <View
          style={{
            flexDirection: "row",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Controller
            name="postcode"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                style={{ ...styles.input, width: "25%" }}
                placeholder="Postcode"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value.replace(/[^0-9]/g, ""))}
                ref={ref}
                value={value}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                style={{ ...styles.input, width: "50%" }}
                placeholder="City"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                ref={ref}
                value={value}
              />
            )}
          />
        </View>
        <Text>Description</Text>

        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={{
                ...styles.input,
                height: "35%",
              }}
              multiline={true}
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              ref={ref}
              value={value}
            />
          )}
        />
        <Text>Contact</Text>
        <Controller
          name="contactInfo"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email, Handynummer, usw"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              ref={ref}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          style={{ ...styles.buttonLogin, marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.project.primary,
    backgroundColor: Colors.project.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  containerInside: {
    height: "90%",
    width: "90%",
    marginTop: 35,
    borderRadius: 35,
    borderColor: Colors.project.warm,
    backgroundColor: Colors.project.warm,
    alignItems: "center",
  },
  containerTop: {
    margin: 15,
    marginLeft: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  input: {
    fontSize: 17,
    paddingLeft: 10,
    marginLeft: 10,
    width: "78%",
    borderRadius: 25,
    backgroundColor: "white",
    marginBottom: 5,
  },
  buttonLogin: {
    borderRadius: 25,
    marginLeft: 15,
    marginTop: 40,
    height: "8%",
    width: "35%",
    backgroundColor: Colors.project.light,
    alignItems: "center",
    justifyContent: "center",
  },
});
