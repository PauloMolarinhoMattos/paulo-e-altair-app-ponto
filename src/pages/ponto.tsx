import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Keyboard } from "react-native";
import { Input } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const screen = Dimensions.get("window");

export default function Ponto() {
    const [isEntrada, setIsEntrada] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false); // Rastrear o status do teclado
  const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Nova state para a data/hora atual


  useEffect(() => {

    
    // Configurando os listeners
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardOpen(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardOpen(false)
    );

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

  const buttonSize = keyboardOpen ? (screen.width - 90) / 3 : screen.width / 2; 
  const buttonTextSize = keyboardOpen ? 20 : 30; // Ajuste do tamanho do texto conforme o teclado
  const firstRowFlex = keyboardOpen ? 0.1 : 1; // Ajuste do flex conforme o teclado




  return (
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
    <View style={styles.container}>
      <View style={[styles.firstRow, { flex: firstRowFlex }]}>
        {/* Conteúdo da primeira parte */}
      </View>
      <View style={styles.secondRow}>
  {
    isEntrada ? (
        <TouchableOpacity 
        style={[
          styles.button, 
          styles.buttonStop, 
          { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2, marginVertical: 10 }
        ]}
        onPress={() => setIsEntrada(false)} // Atualiza isEntrada para false
      >
        <Text style={[styles.buttonText, styles.buttonTextStop, {fontSize: buttonTextSize}]}>Entrar</Text>
      </TouchableOpacity>
    ) : (
        <TouchableOpacity 
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2, marginVertical: 10 }
        ]}
        onPress={() => setIsEntrada(true)} // Atualiza isEntrada para false
      >
        <Text style={[styles.buttonText, {fontSize: buttonTextSize}]}>Sair</Text>
      </TouchableOpacity>
    )
  }

<Text style={[styles.dateText, { marginBottom: 10 }]}>{formatDate(currentDateTime)}</Text>
  <Text style={[styles.locationText, { marginBottom: 10 }]}>Em torno de Furriel, 250</Text>

  <View style={styles.inputWrapper}>
    <Input 
      style={[styles.input, styles.inputTextBlack]}  // Changed color to black here
      placeholder='Justificativa' 
      placeholderTextColor='black'
    />
  </View>
</View>
      <View style={styles.thirdRow}>
        {/* Conteúdo da terceira parte */}
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}

function formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  firstRow: {

  },
  secondRow: {
    flex: 8,  // 80% do espaço disponível
    alignItems: 'center'
  },
  thirdRow: {
    flex: 1,  // 10% do espaço disponível
  },
  button: {
    borderWidth: 5,
    borderColor: "#fabd7b",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "#132f48"
  },
  buttonText: {
    fontSize: 30,
    color: "#fabd7b"
  },

  buttonTextStop: {
    color: "#132f48"
  },
  input: {
    marginVertical: 5,
  },
  inputText: {
    color: 'white',
  },
  inputWrapper: {
    width: '80%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateText: {
    fontSize: 18,  // Increased font size
    marginVertical: 10,  // Added space
    color: 'black'  // Changed color to black
  },
  locationText: {
    fontSize: 18,  // Increased font size
    color: 'black'  // Changed color to black
  },
  inputTextBlack: {
    color: 'black',  // Text color for the Input field
  },
});
