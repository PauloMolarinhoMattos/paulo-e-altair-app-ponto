import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

const DateRangeFilter = (props: { onFilter: (start: Date | null, end: Date | null) => void }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = (selectedDate: Date | undefined) => {
    if (pickerMode === "start" && selectedDate) {
      setStartDate(selectedDate);
    } else if (pickerMode === "end" && selectedDate) {
      setEndDate(selectedDate);
    }
    setPickerMode(null); // Esconde o DateTimePicker após a seleção
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    props.onFilter(null, null);
  };

  const handleDateSelection = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setPickerMode(null);

    if (pickerMode === "start") {
      setStartDate(selectedDate);
    } else if (pickerMode === "end") {
      setEndDate(selectedDate);
    }

    // Esconde o DateTimePicker após a seleção
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginTop: 5,
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
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
        }}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="calendar" size={15} color="#0D5393" />
        <Text
          style={{
            color: "#132f48", // Cor do texto
            fontSize: 11,
            fontWeight: "bold",
            marginLeft: 20,
            letterSpacing: 2,
          }}
        >
          Filtros
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modalView}>
            <View
              style={{
                height: "30%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => setPickerMode("start")} style={styles.dateInput}>
                <Text style={{ fontSize: 15, marginLeft: 5 }}>
                  {startDate ? startDate.toLocaleDateString() : "Data Inicial"}
                </Text>
              </TouchableOpacity>
              {pickerMode === "start" && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    handleDateSelection(selectedDate);
                  }}
                  display="calendar"
                />
              )}
            </View>

            <View
              style={{
                height: "30%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => setPickerMode("end")} style={styles.dateInput}>
                <Text style={{ fontSize: 15, marginLeft: 5 }}>
                  {endDate ? endDate.toLocaleDateString() : "Data Final"}
                </Text>
              </TouchableOpacity>
              {pickerMode === "end" && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  onChange={(event, selectedDate) => {
                    handleDateSelection(selectedDate);
                  }}
                  display="calendar"
                />
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={() => clearDates()}>
                <Text>Limpar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.filterButton]}
                onPress={() => {
                  props.onFilter(startDate, endDate);
                  setModalVisible(false); // Fecha o modal após filtrar
                }}
              >
                <Text>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "35%",
    height: "100%",
  },
  button: {
    padding: 6,
    height: "100%",
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // semi-transparent background
  },
  modalView: {
    width: "90%",
    height: "40%",
    padding: 20,
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 10,
    left: 10, // Reduzir a margem esquerda para 10
    right: 10, // Reduzir a margem direita para 10
  },

  clearButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#04427B",
    borderRadius: 8,
    flexBasis: "48%", // Ajustado para 48% para considerar a margem entre os botões
  },

  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#04427B",
    borderRadius: 8,
    flexBasis: "48%", // Ajustado para 48% para considerar a margem entre os botões
  },

  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  dateInput: {
    height: "70%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 0.5,
    backgroundColor: "white",
    width: "50%",
    borderColor: "#E0E0E0", // Cor de borda mais suave
    paddingVertical: 10,
    paddingHorizontal: 1,
    borderRadius: 10, // Bordas arredondadas

    // Sombras para aparência elevada
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Para Android
    elevation: 3,

    // Ajustes no texto
    fontSize: 17,
    color: "#333", // Cor de texto mais suave
  },
});

export default DateRangeFilter;
