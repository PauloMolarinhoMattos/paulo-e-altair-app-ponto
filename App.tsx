import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { Input } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './src/pages/login';
import Ponto from './src/pages/ponto';
import 'react-native-gesture-handler';
import DrawerRoutes from './src/routes/drawer.routes';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { AjustarPonto } from './src/pages/ajustar-ponto';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown: false}}
      >
        <Stack.Screen 
          name='Login' 
          component={Login} 
        />

        
        <Stack.Screen name='Drawer' component={DrawerRoutes} />

        <Stack.Screen name='AjustarPonto' component={AjustarPonto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


