import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Keyboard, Image, FlatList } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { delay } from "../utils";
import { AuthContext } from "../contexts/auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Rastrear o status do teclado
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Nova state para a data/hora atual

  useFocusEffect(
    React.useCallback(() => {
      console.log("FOCUS");
    }, [])
  );

  useEffect(() => {
    delay(800).then(() => {
      setIsLoading(false);
    });
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

  const mockData = [
    { id: "1", title: "08/10/2023", subtitle: "08:30 - 12:00 - 13:30 - 18:00" },
    { id: "2", title: "07/10/2023", subtitle: "08:30 - 12:00 - 13:30 - 18:00" },
    { id: "3", title: "06/10/2023", subtitle: "08:30 - 12:00 - 13:30 - 18:00" },
  ];

  interface ItemProps {
    title: string;
    subtitle: string;
    func: () => void;
  }

  const Item: React.FC<ItemProps> = ({ title, subtitle, func }) => (
    <TouchableOpacity onPress={func} style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const defaultRingColor = "#007EF4";
  const activeRingColor = "#C59B00";

  function onSavePonto(value: boolean) {
    props.navigation.navigate("LoadingPonto", { firstPonto: context.firstPonto });
    delay(300).then(() => {
      setIsEntrada(!isEntrada);
    });
  }

  const context: any = useContext(AuthContext);

  return isLoading ? (
    <View style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("./../../assets/lottie/animation_lnmmkt86.json")}
        autoPlay
        loop
        style={{ width: 160, height: 160 }}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View
          style={{
            height: "100%",
            backgroundColor: "#183B5B",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={styles.imageWrapper}>
            <Image source={require("./../../assets/logo-branco.png")} style={styles.imageStyle} />
          </View>
          <View style={{ display: "flex", justifyContent: "center" }}>
            <Text style={{ fontSize: 17, color: "white" }}>Bem Vindo, {context.user}</Text>
            <Text style={{ fontSize: 14, color: "white" }}>Desenvolvedor Pleno I</Text>
          </View>
        </View>
      </View>

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

        <View style={{ height: 320 }}></View>

        <Text style={[styles.dateText, { marginBottom: 10 }]}>{formatDate(currentDateTime)}</Text>
        <Text style={[styles.locationText, { marginBottom: 10 }]}>Em torno de Furriel, 250</Text>
      </View>
      <View style={styles.thirdRow}>
        <View style={{ width: "100%", marginTop: 70 }}>
          <Text style={{ fontSize: 15, marginBottom: 3, marginLeft: 10 }}>Últimos Registros</Text>
          <View style={{ display: "flex", alignItems: "center" }}>
            <FlatList
              data={mockData}
              style={{ marginTop: 0, width: "80%", display: "flex" }}
              renderItem={({ item }) => (
                <Item
                  title={item.title}
                  subtitle={item.subtitle}
                  func={() => props.navigation.navigate("AjustarPonto", { dia: item.title, batidas: item.subtitle })}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
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
    flex: 1.1,
    display: "flex",
    justifyContent: "flex-end",
  },
  secondRow: {
    flex: 6, // 80% do espaço disponível
    alignItems: "center",
    justifyContent: "center",
  },
  thirdRow: {
    flex: 5.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 6,
    backgroundColor: "#f5f5f5", // fundo mais claro
    borderRadius: 10, // bordas arredondadas
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // sombra no Android
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#7f7f7f",
  },
  imageStyle: {
    marginTop: 30,
    width: "100%",
    height: "100%",
    resizeMode: "contain", // A imagem será ajustada para caber dentro das dimensões do contêiner
  },
  imageWrapper: {
    height: "65%",
    width: "24%",
    alignItems: "center", // Adicionado para centralizar a imagem horizontalmente
    justifyContent: "center", // Adicionado para centralizar a imagem verticalmente
  },
  button: {
    borderWidth: 3,
    borderColor: "#C59B00",
    width: (screen.width + 20) / 2,
    height: (screen.width + 20) / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 28, // Increased font size
    marginVertical: 23, // Added space
    color: "black", // Changed color to black
  },
  locationText: {
    fontSize: 17, // Increased font size
    color: "black", // Changed color to black
  },
  inputTextBlack: {
    color: "black", // Text color for the Input field
  },
});
