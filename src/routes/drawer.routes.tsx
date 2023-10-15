import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import Ponto from "../pages/ponto";
import ControleDePonto from "../pages/controle-ponto";
import BancoDeHoras from "../pages/banco-horas";
import Aniversariantes from "../pages/aniversariantes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Registrar"
        component={Ponto}
        options={{
          drawerIcon: ({ focused, size, color }) => <FontAwesome name="clock-o" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Gerenciar"
        component={ControleDePonto}
        options={{
          drawerIcon: ({ focused, size, color }) => <FontAwesome name="gear" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Banco de Horas"
        component={BancoDeHoras}
        options={{
          drawerIcon: ({ focused, size, color }) => <FontAwesome name="calendar" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Aniversariantes do Dia"
        component={Aniversariantes}
        options={{
          drawerIcon: ({ focused, size, color }) => <FontAwesome name="birthday-cake" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
