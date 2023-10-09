import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';


export default function Emocoes() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
      <Image source={require('./../../assets/logo-amarela.png')} style={styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  button: {
    margin: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  imageStyle: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain' // A imagem será ajustada para caber dentro das dimensões do contêiner
  },
});
