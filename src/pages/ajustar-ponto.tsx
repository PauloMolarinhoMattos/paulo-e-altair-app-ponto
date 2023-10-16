import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { delay } from "../utils";

import LottieView from "lottie-react-native";

const lottieSource =
  Platform.OS === "ios"
    ? require("./../../assets/lottie/animation_lnqb223p.json")
    : require("./../../assets/lottie/animation_lnmmlqov.json");

export function AjustarPonto(props: any) {
  console.log(props.route.params);
  const [entrada1, setEntrada1] = useState("");
  const [saida1, setSaida1] = useState("");
  const [entrada2, setEntrada2] = useState("");
  const [saida2, setSaida2] = useState("");
  const [entrada3, setEntrada3] = useState("");
  const [saida3, setSaida3] = useState("");
  const [observacao, setObservacao] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const funcoesDeBatida = [setEntrada1, setSaida1, setEntrada2, setSaida2, setEntrada3, setSaida3];

  useFocusEffect(
    React.useCallback(() => {
      props.route.params.batidas.map((batida: string | null, index: number) => {
        funcoesDeBatida[index](batida ? batida : "");
      });
    }, [])
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isJustificativaTouched, setIsJustificativaTouched] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const lottieRef = useRef<LottieView>(null);

  const showPicker = (field: string) => {
    console.log("CLICOU");
    if (Platform.OS === "ios") {
      setIsModalVisible(true);
    }
    console.log("FIELD", field);
    setCurrentField(field);
    setIsPickerVisible(true);
  };

  const handleSetTime = (selectedTime: Date, isModal?: boolean) => {
    if (selectedTime) {
      console.log("CAMPO ATUAL", currentField);

      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      console.log("HORA FORMATADA", timeString);
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

      setSelectedTime(selectedTime);
      setIsPickerVisible(false);
      if (isModal) setIsModalVisible(false);
    }
  };

  const handleSave = () => {
    if (!justificativa) {
      setIsJustificativaTouched(true);
      return; // Se a justificativa estiver vazia, retornaremos cedo e não prosseguiremos com a lógica de salvar.
    }
    // Continuar com a lógica de salvar
    setIsSaving(true);
    console.log("Dados salvos!");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{props.route.params.dia}</Text>
        <TouchableOpacity onPress={() => showPicker("entrada1")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{entrada1 ? entrada1 : "Entrada 1"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker("saida1")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{saida1 ? saida1 : "Saída 1"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker("entrada2")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{entrada2 ? entrada2 : "Entrada 2"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker("saida2")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{saida2 ? saida2 : "Saída 2"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker("entrada3")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{entrada3 ? entrada3 : "Entrada 3"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showPicker("saida3")} style={styles.input}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>{saida3 ? saida3 : "Saída 3"}</Text>
        </TouchableOpacity>

        <TextInput
          value={justificativa}
          onChangeText={setJustificativa}
          placeholder="Justificativa"
          style={[styles.input, isJustificativaTouched && !justificativa ? styles.errorInput : {}]}
          onBlur={() => setIsJustificativaTouched(true)} // Marca o campo como tocado quando ele perde o foco
          multiline // Para permitir múltiplas linhas no input
        />

        {isJustificativaTouched && !justificativa && (
          <Text style={styles.errorText}>A justificativa é obrigatória.</Text>
        )}
        {isPickerVisible && Platform.OS !== "ios" && (
          <DateTimePicker
            mode="time"
            display="spinner" // This will set "spinner" for Android and "default" for iOS.
            value={selectedTime}
            onChange={(event, selectedTime) => {
              if (event.type === "dismissed") {
                setIsPickerVisible(false);
                return;
              }

              if (selectedTime) {
                handleSetTime(selectedTime);
              }
            }}
          />
        )}
        {isPickerVisible && isModalVisible && Platform.OS == "ios" && (
          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <TouchableOpacity style={styles.centeredView} onPress={() => setIsModalVisible(false)} activeOpacity={1}>
              <View style={styles.modalView}>
                <DateTimePicker
                  mode="time"
                  display="default" // Changed this to default
                  value={selectedTime}
                  onChange={(event, selectedTime) => {
                    if (event.type === "dismissed") {
                      setIsPickerVisible(false);
                      setIsModalVisible(false);
                      return;
                    }

                    if (selectedTime) {
                      handleSetTime(selectedTime, true);
                    }
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {isSaving && (
          <Modal animationType="slide" transparent={true} visible={isSaving}>
            <TouchableOpacity style={styles.centeredView} activeOpacity={1}>
              <View
                style={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Text style={{ color: "white", fontSize: 19, fontWeight: 'bold' }}>Ajuste Salvo com Sucesso!</Text>
                <LottieView
                  ref={lottieRef}
                  onLayout={() => lottieRef.current?.play()}
                  source={lottieSource}
                  autoPlay={false}
                  style={{ width: 210, height: 210 }}
                  loop={false}
                  onAnimationFinish={() => {
                    setIsSaving(false);
                  }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        )}
        <TouchableOpacity style={[styles.button, justificativa ? {} : styles.buttonDisabled]} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#F9F9F9", // Um fundo leve
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent background
  },
  modalView: {
    width: "45%",
    height: "15%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center", // Add this
    justifyContent: "center", // Add this
  },

  buttonDisabled: {
    backgroundColor: "#E0E0E0", // Um cinza claro para o fundo do botão desativado
    borderColor: "#C0C0C0", // Um cinza para a borda do botão desativado
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333", // Um tom de cinza mais suave para o título
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0", // Cor de borda mais suave
    padding: 15,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    color: "black",
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
    backgroundColor: "#132f48",
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
    color: "#FFFFFF", // Branco
    fontSize: 18,
    fontWeight: "500",
  },
});
