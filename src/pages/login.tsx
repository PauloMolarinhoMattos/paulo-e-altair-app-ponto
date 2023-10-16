import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, Pressable, View, Image, BackHandler } from "react-native";
import { Input } from "@rneui/base";
import { AuthContext } from "../contexts/auth";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context: any = useContext(AuthContext);

  useEffect(() => {
    const backAction = () => {
      // Here you can navigate to another screen if needed
      // navigation.navigate('Home');

      // Returning `true` from `backAction` denotes that the back action has been handled
      // So, it won't go back.
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  function handleLogin() {
    context.signIn(username, password);
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.imageWrapper}>
          <Image source={require("./../../assets/logo-amarela.png")} style={styles.imageStyle} />
        </View>
      </View>
      <View style={styles.secondRow}>
        <View style={styles.inputWrapper}>
          <Input
            style={[styles.input, styles.inputText]}
            placeholder="Usuário"
            placeholderTextColor="white"
            value={username}
            onChangeText={setUsername} // Atualiza o estado username
          />
          <Input
            style={[styles.input, styles.inputText]}
            placeholder="Senha"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword} // Atualiza o estado password
          />
        </View>
      </View>
      <View style={styles.thirdRow}>
        <Pressable
          onPress={() => handleLogin()}
          style={({ pressed }) => [styles.button, pressed ? { borderColor: "#fabd7b" } : { borderColor: "white" }]}
        >
          {({ pressed }) => <Text style={[{ color: "white" }, pressed ? { color: "#fabd7b" } : {}]}>Entrar</Text>}
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // This is default, so technically you don't need this line.
    backgroundColor: "#132f48",
  },
  firstRow: {
    flex: 4, // 40%
    alignItems: "center", // Centralizar horizontalmente
    justifyContent: "center", // Centralizar verticalmente
  },
  secondRow: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  thirdRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 3, // 30%
  },
  imageWrapper: {
    height: "35%",
    width: "35%",
    alignItems: "center", // Adicionado para centralizar a imagem horizontalmente
    justifyContent: "center", // Adicionado para centralizar a imagem verticalmente
  },

  button: {
    borderRadius: 15,
    borderWidth: 2.2,
    width: 120,
    height: 45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // A imagem será ajustada para caber dentro das dimensões do contêiner
  },
  inputWrapper: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 5,
  },
  inputText: {
    color: "white",
  },
});
