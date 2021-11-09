import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [valueC, setValueC] = useState<number>(0);
  const [valueF, setValueF] = useState<number>(0);

  const handleConvertFtoC = (value: string) => {
    let numberValue;
    if (value !== '' && value !== '-') {
      numberValue = parseInt(value);
    } else {
      numberValue = 0;
    }
    setValueF(Number(numberValue.toFixed(2)));
    return setValueC(((numberValue - 32) * 5) / 9);
  };

  const handleConvertCtoF = (value: string) => {
    let numberValue;
    if (value !== '' && value !== '-') {
      numberValue = parseInt(value);
    } else {
      numberValue = 0;
    }
    setValueC(Number(numberValue.toFixed(2)));
    return setValueF(numberValue * (9 / 5) + 32);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Converter</Text>
      <View style={styles.converter}>
        <View style={styles.box}>
          <TextInput
            keyboardType={'numeric'}
            style={styles.numberbox}
            value={valueC.toString()}
            onChangeText={handleConvertCtoF}
          />
          <Text>Celcius</Text>
        </View>
        <View style={styles.box}>
          <TextInput
            keyboardType={'numeric'}
            style={styles.numberbox}
            value={valueF.toString()}
            onChangeText={handleConvertFtoC}
          />
          <Text>Fahrenheit</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4cd94',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  converter: {
    flex: 0,
    position: 'relative',
    flexDirection: 'row',
  },
  box: {
    height: 100,
    width: 100,
    margin: 10,
    padding: 5,
  },
  numberbox: {
    margin: 1,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
