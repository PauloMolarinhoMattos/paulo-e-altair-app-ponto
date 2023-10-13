import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useFocusEffect } from "@react-navigation/native";

export default function Aniversariantes(props: any) {
  const [confettiKey, setConfettiKey] = useState(0); // adiciona uma chave de estado

  useFocusEffect(
    React.useCallback(() => {
      // sempre que o foco voltar, atualize a chave para remontar o ConfettiCannon
      setConfettiKey((prevKey) => prevKey + 1);
      return () => {}; // retorna uma função de limpeza, se necessário
    }, [])
  );

  return (
    <View style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ConfettiCannon  key={confettiKey} count={30} fadeOut={true} origin={{ x: -10, y: 0 }} />
      <View style={{ marginBottom: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("./../../assets/lottie/animation_lnntf9tl.json")}
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
        />
        <Text style={{ fontSize: 16 }}> Nenhum aniversariante no dia de hoje!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
