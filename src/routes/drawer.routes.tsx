import { createDrawerNavigator } from "@react-navigation/drawer";
import Ponto from "../pages/ponto";
import ControleDePonto from "../pages/controle-ponto";
import BancoDeHoras from "../pages/banco-horas";
import Aniversariantes from "../pages/aniversariantes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Registrar" component={Ponto} />

      <Drawer.Screen name="Gerenciar" component={ControleDePonto} />

      <Drawer.Screen name="Banco de Horas" component={BancoDeHoras} />

      <Drawer.Screen name="Aniversariantes do Dia" component={Aniversariantes}></Drawer.Screen>
    </Drawer.Navigator>
  );
}
