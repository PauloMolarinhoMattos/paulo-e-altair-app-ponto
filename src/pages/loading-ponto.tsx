import { View, Text } from "@motify/components";
import { RouteProp } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from "react-native";
import { delay } from "../utils";
import LottieView from "lottie-react-native";
import { AuthContext } from "../contexts/auth";
import { Platform } from "react-native";

type LoadingPontoProps = {
  navigation: any; // You can specify more precise types if you want.
  route: RouteProp<{ params: { value: string } }, "params">;
};

const screen = Dimensions.get("window");

export default function LoadingPonto(props: any) {
  const lottieSource =
    Platform.OS === "ios"
      ? require("./../../assets/lottie/animation_lnqb223p.json")
      : require("./../../assets/lottie/animation_lnmmlqov.json");

  console.log(props.route.params);
  const [opacity] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(true);
  const [hasClicked, setHasClicked] = useState(false); // Estado para verificar se um LottieView foi clicado.
  const [activeLottie, setActiveLottie] = useState<number | null>(null); // Armazenar qual LottieView foi clicado.
  const [activeImage, setActiveImage] = useState<number | null>(null); // Armazenar qual imagem foi clicada.
  const context: any = useContext(AuthContext);
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    delay(1700).then(() => {
      setIsLoading(false);
      // Inicia a animação quando o loading termina
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });

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

  const handleImageClick = (index: number) => {
    setHasClicked(true);
    if (activeImage === index) {
      setActiveImage(null);
    } else {
      setActiveImage(index);
    }
  };
  const imagens = [
    require("./../../assets/emoji_chorando.png"),
    require("./../../assets/tristinho.png"),
    require("./../../assets/poker_face.png"),
    require("./../../assets/felizinho.webp"),
    require("./../../assets/emoji_feliz.png"),
  ];

  return (
    <View
      style={
        isLoading ? styles.loadingContainer : props.route.params.firstPonto ? styles.container : styles.loadingContainer
      }
    >
      {isLoading ? (
        <LottieView
          source={require("./../../assets/lottie/animation_lnmmkt86.json")}
          autoPlay
          loop
          style={{ width: 160, height: 160 }}
        />
      ) : props.route.params.firstPonto ? (
        <Animated.View style={{ ...styles.content, opacity: opacity }}>
          <View style={{ flex: 2, width: "100%", display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: 20, flex: 1 }}>Como você está se sentindo hoje?</Text>
            <View
              style={{
                flex: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View style={styles.lottieContainer}>
                {imagens.map((imageSource, index) => {
                  if (index == 3) {
                    return (
                      <TouchableWithoutFeedback onPress={() => handleImageClick(index)} key={index}>
                        <Image
                          style={
                            index === activeImage
                              ? { width: "15%", height: "120%", transform: [{ scale: 1.5 }] }
                              : { width: "15%" }
                          }
                          source={imageSource}
                          resizeMode="contain"
                        />
                      </TouchableWithoutFeedback>
                    );
                  }

                  return (
                    <TouchableWithoutFeedback onPress={() => handleImageClick(index)} key={index}>
                      <Image
                        style={index === activeImage ? styles.activeImageStyle : styles.imageStyle}
                        source={imageSource}
                        resizeMode="contain"
                      />
                    </TouchableWithoutFeedback>
                  );
                })}
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
              onPress={() => {
                context.setFirstPonto(false);
                props.navigation.goBack();
              }} // Atualiza isEntrada para false
            >
              <Text style={{ fontSize: 16, color: "#132f48" }}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 7,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LottieView
              ref={lottieRef}
              onLayout={() => lottieRef.current?.play()}
              source={lottieSource}
              autoPlay={false}
              style={{ width: 210, height: 210, position: "absolute" }}
              loop={false}
              onAnimationFinish={() => {
                props.navigation.goBack();
              }}
            />
          </View>

          <View
            style={{
              flex: 5,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 19, color: "#132f48" }}>Batida Registrada com sucesso!</Text>
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
    backgroundColor: "rgba(0,0,0,0.7)", // adicionando um fundo preto semi-transparente
  },
  loadingContainer: {
    flex: 1,
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF", // Branco total
  },

  content: {
    width: screen.width / 1.1,
    height: screen.height / 3.2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 16,

    // Sombra no iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,

    // Sombra no Android
    elevation: 10,
  },

  activeImageStyle: {
    width: "13%",
    height: "120%",
    transform: [{ scale: 1.5 }],
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    width: "12%",
    height: "100%",
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
