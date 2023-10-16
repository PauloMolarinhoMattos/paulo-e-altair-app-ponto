import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/pages/login";
import "react-native-gesture-handler";
import DrawerRoutes from "./src/routes/drawer.routes";
import { AjustarPonto } from "./src/pages/ajustar-ponto";
import LoadingPonto from "./src/pages/loading-ponto";
import AuthProvider from "./src/contexts/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

          <Stack.Screen name="Drawer" options={{ headerShown: false }} component={DrawerRoutes} />

          <Stack.Screen name="Ajustar Ponto" component={AjustarPonto} />

          <Stack.Screen name="LoadingPonto" options={{ headerShown: false }} component={LoadingPonto}></Stack.Screen>
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
