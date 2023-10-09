import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function BancoDeHoras() {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
          datasets: [
            {
              data: [10, 10, 45, 60, 55, 30]
            }
          ]
        }}
        width={Dimensions.get("window").width - 40} // subtraia o padding total (20 à esquerda e 20 à direita)
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
            backgroundColor: "#132f48",
            backgroundGradientFrom: "#132f48",
            backgroundGradientTo: "#ff8a50", // Ajustado para um tom de laranja mais escuro
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Text style={styles.hoursText}>+68 Horas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, // Isso adiciona um padding ao componente
  },
  hoursText: {
    fontSize: 20, // Isso aumenta o tamanho do texto
    textAlign: 'right', // Isso coloca o texto à direita
    marginTop: 10,
  }
});
