import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export default function Sair(props: { navigation: { navigate: (route: string) => void } }) {
  useFocusEffect(
    React.useCallback(() => {
      props.navigation.navigate("Login");
    }, [])
  );

  return (
    <View>
      <Text>Saindo...</Text>
    </View>
  );
}
