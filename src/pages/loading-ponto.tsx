import { View, Text } from "@motify/components";
import { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { BackHandler, Button, Touchable, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { delay } from "../utils";

import LottieView from "lottie-react-native";

type LoadingPontoProps = {
  navigation: any; // You can specify more precise types if you want.
  route: RouteProp<{ params: { value: string } }, "params">;
};

const screen = Dimensions.get("window");

export default function LoadingPonto(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasClicked, setHasClicked] = useState(false); // Estado para verificar se um LottieView foi clicado.
  const [activeLottie, setActiveLottie] = useState<number | null>(null); // Armazenar qual LottieView foi clicado.

  useEffect(() => {
    delay(1700).then(() => setIsLoading(false));

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

  const handleLottieClick = (index: number) => {
    setHasClicked(true);
    setActiveLottie(index);
  };

  const animations = [
    require("./../../assets/lottie/animation_lnne8k30.json"),
    require("./../../assets/lottie/animation_lnne7fv3.json"),
    require("./../../assets/lottie/animation_lnne6txk.json"),
    require("./../../assets/lottie/animation_lnneex2t.json"),
    require("./../../assets/lottie/animation_lnne5bze.json")
];

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LottieView
          source={require("./../../assets/lottie/animation_lnmmkt86.json")}
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
        />
      ) : (
        <View style={styles.content}>
          <View style={{ flex: 2, width: "100%", display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: 20, flex: 1 }}>Como você está se sentindo hoje?</Text>
            <View
              style={{
                flex: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <View style={styles.lottieContainer}>
                {animations.map((animationSource, index) => (
                  <TouchableWithoutFeedback onPress={() => handleLottieClick(index)} key={index}>
                    <LottieView
                      style={styles.lottieStyle}
                      source={animationSource}
                      autoPlay={hasClicked && activeLottie === index}
                      loop={hasClicked && activeLottie === index}
                    />
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          </View>

          <View style={{ flex: 0.6, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: "70%",
                borderWidth: 2,
                borderColor: "#132f48",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              disabled={false}
              onPress={() => props.navigation.goBack()} // Atualiza isEntrada para false
            >
              <Text style={{ fontSize: 16, color: "#132f48" }}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: screen.width / 1.1,
    height: screen.height / 2.3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  lottieContainer: {
    flexDirection: "row", // Isso faz com que os LottieViews fiquem lado a lado.
    justifyContent: "space-between", // Espaça os componentes de maneira uniforme.
    alignItems: "center", // Alinha os LottieViews verticalmente ao centro.
    width: "100%", // Pega a largura total do container.
    height: "70%", // Ajuste conforme necessário
  },
  lottieStyle: {
    width: "20%", // Largura de cada LottieView.
    height: "100%", // Ocupa toda a altura do container.
  },
});
