import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Modal,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import DateRangeFilter from "../components/date-range";
import { FontAwesome } from "@expo/vector-icons"; // Importe o ícone necessário
import Icon from "react-native-vector-icons/Ionicons"; // Estou usando Ionicons aqui, mas você pode escolher outro conjunto de ícones.

const mockData = [
  { id: "1", title: "13/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "2", title: "11/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "3", title: "10/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "4", title: "09/10/2023", horarios: ["08:30", "12:00", null, null] },
  { id: "5", title: "06/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "7", title: "22/09/2023", horarios: ["08:30", "12:00", "13:30", null] },
  { id: "8", title: "21/09/2023", horarios: ["08:30", "12:00", "13:30", null] },
  { id: "9", title: "20/09/2023", horarios: ["08:30", "12:00", "13:30", null] },
];

interface ItemProps {
  title: string;
  horarios: (string | null)[];
  func: () => void;
}

const Item: React.FC<ItemProps> = ({ title, horarios, func }) => {
  const hasNullValue = horarios.includes(null);

  return (
    <TouchableOpacity onPress={func} style={[styles.itemContainer, hasNullValue && styles.itemContainerWarning]}>
      <View
        style={{
          width: "16%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasNullValue ? (
          <Icon name="warning-outline" size={23} color="#DAA520" />
        ) : (
          <Icon name="location-outline" size={23} color="#0A4B86" selectionColor="#0A4B86" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{title}</Text>
        <Text style={styles.itemSubtitle}>
          {horarios.map((horario, index) => (horario ? horario : "X")).join(" - ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ControleDePonto = (props: any) => {
  const lottieSource =
    Platform.OS === "ios"
      ? require("./../../assets/lottie/animation_lnrqvhef.json")
      : require("./../../assets/lottie/animation_lnrqvhef.json");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const lottieRef = useRef<LottieView>(null);
  const [filteredData, setFilteredData] = useState(mockData); // Novo estado para dados filtrados

  const handleDateFilter = (start: Date | null, end: Date | null, filterInconsistentData: boolean) => {
    let result: typeof mockData = mockData;

    if (start || end) {
      result = result.filter((item) => {
        const itemDate = new Date(item.title.split("/").reverse().join("-"));
        if (start && !end) {
          return itemDate >= start;
        } else if (!start && end) {
          return itemDate <= end;
        } else if (start && end) {
          return itemDate >= start && itemDate <= end;
        } else {
          return true;
        }
      });
    }

    if (filterInconsistentData) {
      result = result.filter((item) => item.horarios.includes(null));
    }

    setFilteredData(result);
  };

  const ButtonRelatorio: React.FC<TouchableOpacityProps> = ({ children, ...props }) => {
    return (
      <TouchableOpacity style={[styles.button]} {...props}>
        <FontAwesome name="download" size={15} color="#0D5393" style={styles.icon} />
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <LottieView
            ref={lottieRef}
            onLayout={() => lottieRef.current?.play()}
            source={lottieSource}
            autoPlay={false}
            style={{ width: 210, height: 210 }}
            loop={false}
            onAnimationFinish={() => {
              setIsModalVisible(false);
            }}
          />
          <Text style={styles.modalText}>Downloading...</Text>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          justifyContent: "space-between",
          height: "7%",
          marginBottom: 10,
        }}
      >
        <DateRangeFilter onFilter={handleDateFilter} />
        <ButtonRelatorio
          onPress={() => {
            setIsModalVisible(true);
            // Adicione aqui a ação do botão, se necessário
          }}
        >
          Relatório
        </ButtonRelatorio>
      </View>
      <FlatList
        data={filteredData} // Usando filteredData em vez de mockData
        renderItem={({ item }) => (
          <Item
            title={item.title}
            horarios={item.horarios}
            func={() => props.navigation.navigate("Ajustar Ponto", { dia: item.title, batidas: item.horarios })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 2,
    marginTop: 2,
    width: "35%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  itemContainerWarning: {
    shadowColor: "#A08C01",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFFFFF",
  },
  icon: {
    marginRight: 10, // Adiciona algum espaço entre o ícone e o texto
  },
  buttonText: {
    color: "#132f48", // Cor do texto
    fontSize: 11,
    fontWeight: "600", // Texto mais em negrito

    letterSpacing: 2,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingLeft: 0,
    margin: 8,
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
});

export default ControleDePonto;
