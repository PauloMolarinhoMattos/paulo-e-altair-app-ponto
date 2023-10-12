import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Keyboard } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const Ring = (props: { delay: number; color: string }) => {
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
      borderColor: props.color, // Use the color prop
    };
  });

  useEffect(() => {
    ring.value = withDelay(props.delay, withRepeat(withTiming(1, { duration: 4000 }), -1));
  }, []);
  return <Animated.View style={[styles.ring, style]}></Animated.View>;
};
const screen = Dimensions.get("window");

export default function Ponto(props: any) {
  const [isEntrada, setIsEntrada] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Rastrear o status do teclado
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Nova state para a data/hora atual

  useFocusEffect(
    React.useCallback(() => {
      console.log("FOCUS");
    }, [])
  );

  useEffect(() => {
    // Configurando os listeners
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));

    // Função para atualizar a data/hora a cada segundo
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Limpando o intervalo ao desmontar o componente

    // Limpando os listeners ao desmontar o componente

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      clearInterval(interval);
    };
  }, []);

  const defaultRingColor = "#007EF4";
  const activeRingColor = "#C59B00";

  function onSavePonto(value: boolean) {
    props.navigation.navigate("LoadingPonto");
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}></View>

      <View style={styles.secondRow}>
        <Ring delay={0} color={isEntrada ? defaultRingColor : activeRingColor}></Ring>
        <Ring delay={500} color={isEntrada ? defaultRingColor : activeRingColor}></Ring>
        <Ring delay={1000} color={isEntrada ? defaultRingColor : activeRingColor}></Ring>
        <Ring delay={1500} color={isEntrada ? defaultRingColor : activeRingColor}></Ring>

        {isEntrada ? (
          <TouchableOpacity
            style={[styles.button, styles.buttonStop]}
            onPress={() => onSavePonto(false)} // Atualiza isEntrada para false
          >
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Entrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSavePonto(true)} // Atualiza isEntrada para false
          >
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 350 }}></View>

        <Text style={[styles.dateText, { marginBottom: 10 }]}>{formatDate(currentDateTime)}</Text>
        <Text style={[styles.locationText, { marginBottom: 10 }]}>Em torno de Furriel, 250</Text>
      </View>
      <View style={styles.thirdRow}></View>
    </View>
  );
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  firstRow: {
    flex: 1,
  },
  secondRow: {
    flex: 5, // 80% do espaço disponível
    alignItems: "center",
    justifyContent: "center",
  },
  thirdRow: {
    flex: 4, // 10% do espaço disponível
  },
  button: {
    borderWidth: 3,
    borderColor: "#C59B00",
    width: (screen.width + 20) / 2,
    height: (screen.width + 20) / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    position: "absolute",
    backgroundColor: "white",
  },
  buttonStop: {
    borderColor: "#132f48",
  },
  buttonText: {
    fontSize: 28,
    color: "#C59B00",
  },
  ring: {
    width: 97,
    height: 97,
    borderRadius: 100,
    borderWidth: 10,
    position: "absolute",
  },

  buttonTextStop: {
    color: "#132f48",
  },
  input: {
    marginVertical: 5,
  },
  inputText: {
    color: "white",
  },
  inputWrapper: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  dateText: {
    fontSize: 30, // Increased font size
    marginVertical: 23, // Added space
    color: "black", // Changed color to black
  },
  locationText: {
    fontSize: 18, // Increased font size
    color: "black", // Changed color to black
  },
  inputTextBlack: {
    color: "black", // Text color for the Input field
  },
});
