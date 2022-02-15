import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RootTabScreenProps, FormDataInput } from "../types";
import Colors from "../constants/Colors";
import { API_URL } from "react-native-dotenv";
import UserContext from "../context/userContext";

export default function UserScreen({ route }: RootTabScreenProps<"Profile">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormDataInput>();
  const [login, setLogin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleRedirect = () => {
    if (login === true) {
      return setLogin(false);
    } else {
      return setLogin(true);
    }
  };

  const onSubmit = async (data: FormDataInput) => {
    if (login) {
      const { email, password } = data;
      const fetchURL = `${API_URL}/user/login`;
      fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Length": "219",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then(async (response) => {
          setValue("email", "");
          setValue("password", "");
          setUser(response.token);
          console.log(response);
        })
        .catch((res) => {
          res.json().then((json: any) => {
            console.log(json);
          });
        });
    } else {
      const { registerEmail, registerPassword, username } = data;
      const fetchURL = `${API_URL}/user/create`;
      fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Length": "219",
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          username: username,
          email: registerEmail,
          password: registerPassword,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res);
        })
        .then(async (response) => {
          setValue("username", "");
          setValue("registerEmail", "");
          setValue("registerPassword", "");
          setValue("registerPasswordConfirm", "");
          console.log(response);
        })
        .catch((res) => {
          res.json().then((json: any) => {
            console.log(json);
          });
        });
    }
  };
  const handleLogout = () => {
    setUser("");
  };
  useEffect(() => {
    if (route.params) {
      setLogin(route.params.login);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View style={styles.containerInside}>
        <MaterialCommunityIcons
          name="map-legend"
          size={250}
          color={Colors.project.light}
        />
        {user.length > 1 ? (
          <TouchableOpacity
            style={{ ...styles.buttonLogin, marginTop: 20 }}
            onPress={handleLogout}
          >
            <Text>Logout</Text>
          </TouchableOpacity>
        ) : (
          <>
            {login ? (
              <View style={styles.containerLogin}>
                <Text>Email</Text>
                <View style={{ padding: 5 }} />
                <Controller
                  name="email"
                  key="email"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  rules={{
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Not a valid email-address",
                    },
                    required: { value: true, message: "Email is required!" },
                  }}
                />
                <Text style={{ color: "red" }}>{errors.email?.message}</Text>
                <View style={{ padding: 5 }} />
                <Text>Password</Text>
                <View style={{ padding: 5 }} />
                <Controller
                  name="password"
                  key="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      secureTextEntry={true}
                      value={value}
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Password is required!" },
                  }}
                />
                <Text style={{ color: "red" }}>{errors.password?.message}</Text>
              </View>
            ) : (
              <View
                style={{
                  ...styles.containerLogin,
                  paddingTop: 0,
                  marginTop: 0,
                }}
              >
                <Text>Username</Text>
                <View style={{ padding: 1 }} />
                <Controller
                  name="username"
                  key="username"
                  control={control}
                  render={({ field: { onChange, onBlur, value, ...rest } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Username"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      {...rest}
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Username is required!" },
                  }}
                />
                <Text style={{ color: "red" }}>{errors.username?.message}</Text>
                <View style={{ padding: 1 }} />
                <Text>Email</Text>
                <View style={{ padding: 1 }} />
                <Controller
                  name="registerEmail"
                  key="registerEmail"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  rules={{
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Not a valid email-address",
                    },
                    required: { value: true, message: "Email is required!" },
                  }}
                />
                <Text style={{ color: "red" }}>
                  {errors.registerEmail?.message}
                </Text>
                <Text>Password</Text>
                <View style={{ padding: 1 }} />
                <Controller
                  name="registerPassword"
                  key="registerPassword"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      secureTextEntry={true}
                      value={value}
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Password is required!" },
                  }}
                />
                <Text style={{ color: "red" }}>
                  {errors.registerPassword?.message}
                </Text>
                <Text>Confirm Password</Text>
                <View style={{ padding: 1 }} />
                <Controller
                  name="registerPasswordConfirm"
                  key="registerPasswordConfirm"
                  control={control}
                  rules={{
                    required: "Password is required!",
                    validate: (value) => {
                      if (value === getValues().registerPassword) {
                        return true;
                      }
                      return "Kennwort stimmt nicht überein";
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      secureTextEntry={true}
                      value={value}
                    />
                  )}
                />
                <Text style={{ color: "red" }}>
                  {errors.registerPasswordConfirm?.message}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={{ ...styles.buttonLogin, marginTop: 20 }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>{login ? "Login" : "Register"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.buttonLogin, marginTop: 20 }}
              onPress={handleRedirect}
            >
              <Text>{login ? "Register?" : "Login?"}</Text>
            </TouchableOpacity>
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
  containerLogin: {
    paddingTop: 70,
    margin: 15,
    marginLeft: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
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
