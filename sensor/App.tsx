import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Accelerometer } from "expo-sensors";
import * as Sharing from "expo-sharing";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState<any>(null);
  const [sample, setSample] = useState<number>(0);
  const [csv, setCsv] = useState("");

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _subscribe = () => {
    setSample((prev) => prev + 1);
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        const data = Object.values(accelerometerData).join(",") + "\n";
        setCsv((prev) => prev + data);
        setData(accelerometerData);
      })
    );
  };

  const handleCSV = async () => {
    const header = "x,y,z\n";
    const csvString = `${header}${csv}`;
    console.log(FileSystem.documentDirectory);
    const fileUri =
      FileSystem.documentDirectory +
      "sample_" +
      uuidv4().substring(sample, 4) +
      String("_" + sample) +
      ".csv";
    await FileSystem.writeAsStringAsync(fileUri, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const UTI = "public.item";
    await Sharing.shareAsync(fileUri, { UTI });
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
    handleCSV();
  };

  const cleanup = () => {
    subscription && subscription.remove();
    setSubscription(null);
    setSample(0);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const { x, y, z } = data;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={styles.text}>sample: {sample}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n: number) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
