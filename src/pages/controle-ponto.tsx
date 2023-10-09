// ListaDeItens.js

import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const mockData = [
    { id: '1', title: '08/10/2023', subtitle: '08:30 - 12:00 - 13:30 - 18:00' },
    { id: '2', title: '07/10/2023', subtitle: '08:30 - 12:00 - 13:30 - 18:00' },
    { id: '3', title: '06/10/2023', subtitle: '08:30 - 12:00 - 13:30 - 18:00' },
    { id: '4', title: '05/10/2023', subtitle: '08:30 - 12:00 - 13:30 - 18:00' },
    { id: '5', title: '04/10/2023', subtitle: '08:30 - 12:00 - 13:30 - X' },
    // ... adicione mais itens conforme necessário
  ];
  
  interface ItemProps {
    title: string;
    subtitle: string;
    func: ()=> void;
  }
  

  const Item: React.FC<ItemProps> = ({ title, subtitle, func }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{title}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <Button title="ajustar" onPress={() => func()} />
    </View>
  );

const ControleDePonto = (props: any) => {
    return (
        <FlatList
          data={mockData}
          renderItem={({ item }) => <Item title={item.title} subtitle={item.subtitle} func={()=> props.navigation.navigate('AjustarPonto')} />}
          keyExtractor={item => item.id}
        />
      );
};

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    textContainer: {
      flex: 1,
    },
    itemText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemSubtitle: {
      fontSize: 14,
      color: '#7f7f7f',
    },
  });
  

export default ControleDePonto;
