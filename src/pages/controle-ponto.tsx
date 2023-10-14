import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const mockData = [
  { id: "1", title: "13/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "2", title: "11/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "3", title: "10/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "4", title: "09/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "5", title: "06/10/2023", horarios: ["08:30", "12:00", "13:30", "18:00"] },
  { id: "6", title: "05/10/2023", horarios: ["08:30", "12:00", "13:30", null] },
];

interface ItemProps {
  title: string;
  horarios: (string | null)[];
  func: () => void;
}

const Item: React.FC<ItemProps> = ({ title, horarios, func }) => (
  <TouchableOpacity onPress={func} style={styles.itemContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.itemText}>{title}</Text>
      <Text style={styles.itemSubtitle}>{horarios.map((horario, index) => (horario ? horario : "X")).join(" - ")}</Text>
    </View>
  </TouchableOpacity>
);

const ControleDePonto = (props: any) => {
  return (
    <FlatList
      data={mockData}
      renderItem={({ item }) => (
        <Item
          title={item.title}
          horarios={item.horarios}
          func={() => props.navigation.navigate("Ajustar Ponto", { dia: item.title, batidas: item.horarios })}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
