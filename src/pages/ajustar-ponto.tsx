import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function AjustarPonto(props: any) {
  console.log(props.route.params);
  const [entrada1, setEntrada1] = useState("");
  const [saida1, setSaida1] = useState("");
  const [entrada2, setEntrada2] = useState("");
  const [saida2, setSaida2] = useState("");
  const [entrada3, setEntrada3] = useState("");
  const [saida3, setSaida3] = useState("");
  const [observacao, setObservacao] = useState("");

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showPicker = (field: string) => {
    setCurrentField(field);
    setIsPickerVisible(true);
  };

  const handleSetTime = (event: any, selectedTime?: Date) => {
    setIsPickerVisible(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const timeString = `${hours}:${minutes}`;
      switch (currentField) {
        case "entrada1":
          setEntrada1(timeString);
          break;
        case "entrada2":
          setEntrada2(timeString);
          break;
        case "entrada3":
          setEntrada3(timeString);
          break;
        case "saida1":
          setSaida1(timeString);
          break;
        case "saida2":
          setSaida2(timeString);
          break;
        case "saida3":
          setSaida3(timeString);
          break;
      }
    }
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar os dados dos inputs
    console.log("Dados salvos!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.params.dia}</Text>
      <TouchableOpacity onPress={() => showPicker("entrada1")}>
        <TextInput value={entrada1} placeholder="Entrada 1" style={styles.input} editable={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showPicker("saida1")}>
        <TextInput value={saida1} placeholder="Saída 1" style={styles.input} editable={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showPicker("entrada2")}>
        <TextInput value={entrada2} placeholder="Entrada 2" style={styles.input} editable={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showPicker("saida2")}>
        <TextInput value={saida2} placeholder="Saída 2" style={styles.input} editable={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showPicker("entrada3")}>
        <TextInput value={entrada3} placeholder="Entrada 3" style={styles.input} editable={false} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showPicker("saida3")}>
        <TextInput value={saida3} placeholder="Saída 3" style={styles.input} editable={false} />
      </TouchableOpacity>

      {isPickerVisible && (
        <DateTimePicker
          mode="time"
          display="spinner"
          value={selectedTime}
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              handleSetTime(selectedTime)
              setSelectedTime(selectedTime);
              setIsPickerVisible(false);
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9", // Um fundo leve
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333", // Um tom de cinza mais suave para o título
    marginBottom: 30,
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0", // Cor de borda mais suave
    padding: 15,
    fontSize: 18,
    borderRadius: 12, // Bordas mais arredondadas
    marginBottom: 15,
    backgroundColor: "#FFF", // Fundo branco
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    backgroundColor: "white", // Uma cor primária sutil
    padding: 15,
    borderWidth: 1,
    borderColor: "#132f48",
    borderRadius: 12, // Bordas mais arredondadas no botão
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#132f48",
    fontSize: 18,
    fontWeight: "500",
  },
});
