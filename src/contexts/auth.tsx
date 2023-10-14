import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider(props: any) {
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [firstPonto, setFirstPonto] = useState(true);
  function signIn(email: string, password: string) {
 //   if (email !== "" && password !== "") {
      setUser(email);
      setFirstPonto(true);
      navigation.navigate("Drawer" as never);
   // }
  }

  return (
    <AuthContext.Provider value={{ nome: "teste", signIn, user, setFirstPonto, firstPonto }}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
