import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export function AjustarPonto(props: any) {
  console.log(props.route.params);
  const [entrada1, setEntrada1] = useState("");
  const [saida1, setSaida1] = useState("");
  const [entrada2, setEntrada2] = useState("");
  const [saida2, setSaida2] = useState("");
  const [entrada3, setEntrada3] = useState("");
  const [saida3, setSaida3] = useState("");
  const [observacao, setObservacao] = useState("");

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar os dados dos inputs
    console.log("Dados salvos!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.route.params.dia}</Text>
      <TextInput value={entrada1} onChangeText={setEntrada1} placeholder="Entrada 1" style={styles.input} />
      <TextInput value={saida1} onChangeText={setSaida1} placeholder="Saída 1" style={styles.input} />
      <TextInput value={entrada2} onChangeText={setEntrada2} placeholder="Entrada 2" style={styles.input} />
      <TextInput value={saida2} onChangeText={setSaida2} placeholder="Saída 2" style={styles.input} />
      <TextInput value={entrada3} onChangeText={setEntrada3} placeholder="Entrada 3" style={styles.input} />
      <TextInput value={saida3} onChangeText={setSaida3} placeholder="Saída 3" style={styles.input} />
      <TextInput
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Observação"
        style={styles.input}
        multiline
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
    paddingTop: 20, // padding adicionado ao topo
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
  },
});
