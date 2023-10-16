import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Pega a largura da janela
const screenWidth = Dimensions.get("window").width;

// Largura do gráfico é a largura da janela menos o padding total
const chartWidth = screenWidth - 50;

export default function BancoDeHoras() {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Saldo de Banco de Horas</Text>
        <LineChart
          data={{
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
            datasets: [
              {
                data: [10, 10, 45, 60, 55, 30],
              },
            ],
          }}
          width={chartWidth} // subtraia o padding total (20 à esquerda e 20 à direita)
          height={220}
          yAxisSuffix=" h"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#132f48",
            backgroundGradientFrom: "#132f48", // Azul escuro
            backgroundGradientTo: "#007CAF", // Azul mais claro
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            borderRadius: 16,
            width: "50%",
          }}
        />
        <Text style={styles.hoursText}>+ 68 Horas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, // Isso adiciona um padding ao componente
  },
  hoursText: {
    fontSize: 20, // Isso aumenta o tamanho do texto
    textAlign: "right", // Isso coloca o texto à direita
    marginTop: 10,
    color: "#0D762D",
  },
  chartContainer: {
    padding: 5,
    width: "auto",
    borderRadius: 16, // Borda arredondada
    backgroundColor: "white", // Cor de fundo. Você pode ajustar conforme sua preferência
    shadowColor: "#000", // Cor da sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Opacidade da sombra
    shadowRadius: 3.84, // Raio da sombra

    elevation: 5, // Elevation para Android
    marginBottom: 20, // Espaçamento para evitar que os elementos fiquem muito juntos
  },
});
