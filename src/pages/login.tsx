import React, { useContext, useEffect, useState, useRef } from "react";
import { StyleSheet, Text, Pressable, View, Image, BackHandler, TextInput, Keyboard } from "react-native";
import { Animated, Easing } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context: any = useContext(AuthContext);

  const welcomeAnim = useRef(new Animated.Value(-200)).current; // Posição inicial fora da tela para o texto "Bem-Vindo(a)"
  const inputAnim = useRef(new Animated.Value(-200)).current; // Posição inicial fora da tela para os campos de entrada
  const buttonAnim = useRef(new Animated.Value(600)).current; // Posição inicial fora da tela para o botão

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      welcomeAnim.setValue(-200);
      inputAnim.setValue(600);
      buttonAnim.setValue(600);
      Animated.parallel([
        Animated.timing(welcomeAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(inputAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  const [fontSize, setFontSize] = useState(40); // State para controlar o tamanho da fonte

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setFontSize(20); // Define o tamanho da fonte para 20 quando o teclado é exibido
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setFontSize(40); // Retorna o tamanho da fonte para 40 quando o teclado é ocultado
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  function handleLogin() {
    context.signIn(username, password);
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.firstRow, { transform: [{ translateX: welcomeAnim }] }]}>
        <View style={{ width: "100%", flex: 4, alignItems: "center", justifyContent: "center" }}>
          <View style={styles.imageWrapper}>
            <Image source={require("./../../assets/logo-amarela.png")} style={styles.imageStyle} />
          </View>
        </View>
        <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: fontSize, color: "white", fontWeight: "bold" }}>Bem-Vindo(a)</Text>
        </View>
      </Animated.View>

      <Animated.View style={[styles.secondRow, { transform: [{ translateX: inputAnim }] }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, styles.inputText, styles.inputField]}
            placeholder="Usuário"
            placeholderTextColor="#959595"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={[styles.input, styles.inputText, styles.inputField]}
            placeholder="Senha"
            placeholderTextColor="#959595"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <View style={{ width: "85%" }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#AFAFAF",
                marginLeft: 3,
                textDecorationLine: "underline",
              }}
            >
              Esqueceu a senha?
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View style={[styles.thirdRow, { transform: [{ translateY: buttonAnim }] }]}>
        <Pressable
          onPress={() => handleLogin()}
          style={({ pressed }) => [
            styles.button,
            pressed ? { backgroundColor: "#001F3A" } : { backgroundColor: "#0169A5" },
          ]}
        >
          {({ pressed }) => (
            <Text style={[{ color: "white", fontSize: 20, fontWeight: "bold", letterSpacing: 2 }]}>Entrar</Text>
          )}
        </Pressable>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // This is default, so technically you don't need this line.
    backgroundColor: "#033C5D",
  },
  firstRow: {
    flex: 4, // 40%
    alignItems: "center", // Centralizar horizontalmente
    justifyContent: "center", // Centralizar verticalmente
    display: "flex",
  },
  secondRow: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  thirdRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 3, // 30%
  },
  imageWrapper: {
    height: "35%",
    width: "35%",
    alignItems: "center", // Adicionado para centralizar a imagem horizontalmente
    justifyContent: "center", // Adicionado para centralizar a imagem verticalmente
  },

  button: {
    borderRadius: 22,
    backgroundColor: "#0169A5",
    width: 170,
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: 10,
    color: "#000",
    height: 50, // Ajustando a altura dos campos de entrada
    marginVertical: 5,
    marginBottom: 30,
    width: "85%",
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
