import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { evaluate } from "mathjs";

export default function App() {
  const [value, setValue] = useState<number>(0);
  const [prevValue, setPrevValue] = useState<number>(0);
  const [operator, setOperator] = useState<string>("");
  const [repeat, setRepeat] = useState<boolean>(false);

  const handleAddInput = (input: any) => {
    let tmp;
    if (value === 0) {
      tmp = String(input);
    } else {
      tmp = String(value) + String(input);
    }
    setValue(parseInt(tmp));
    return true;
  };

  const handleMathOperator = (input: any) => {
    setPrevValue(value);
    setValue(0);
    setOperator(input);
  };

  const handleOperator = (input: any) => {
    switch (input) {
      case "=":
        if (operator !== "") {
          let mathExp;
          if ((operator === "/" || operator === "-") && repeat) {
            mathExp = value + " " + operator + " " + prevValue;
          } else {
            mathExp = prevValue + " " + operator + " " + value;
          }
          const result = evaluate(mathExp);
          if (!repeat) {
            setPrevValue(value);
          }
          setValue(result);
          setRepeat(true);
          console.log(prevValue, value, result, mathExp);
        }
        break;
      case "C":
        setValue(0);
        setPrevValue(0);
        setOperator("");
        setRepeat(false);
        break;
      case "CE":
        const newValue = String(value).substring(0, String(value).length - 1);
        setValue(Number(newValue));
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taschenrechner</Text>
      <Text style={styles.value}>{value}</Text>
      <View>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(7)}
            >
              <Text>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(8)}
            >
              <Text>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(9)}
            >
              <Text>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleMathOperator("+")}
            >
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleMathOperator("/")}
            >
              <Text>÷</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(4)}
            >
              <Text>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(5)}
            >
              <Text>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(6)}
            >
              <Text>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleMathOperator("-")}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleOperator("C")}
            >
              <Text>C</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(1)}
            >
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(2)}
            >
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(3)}
            >
              <Text>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleMathOperator("*")}
            >
              <Text>*</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleOperator("CE")}
            >
              <Text>CE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleAddInput(0)}
            >
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => handleOperator("=")}
            >
              <Text>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4cd94",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    top: 110,
    position: "absolute",
    fontSize: 30,
    fontFamily: "Cochin",
    fontWeight: "bold",
  },
  value: {
    position: "absolute",
    top: 180,
    width: 200,
    fontSize: 60,
    fontFamily: "Cochin",
    fontWeight: "bold",
  },
  box: {
    position: "relative",
    top: 80,
    width: 300,
    height: 60,
    padding: 20,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#64b4b5",
  },
});
