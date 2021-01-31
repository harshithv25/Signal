import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./views/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./views/Register";
import Home from "./views/Home";
import Loading from "./views/Loading";

const Stack = createStackNavigator();
const globalStyle = {
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTitleColor: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalStyle}>
        <Stack.Screen name="Signal" options={{ headerShown: false }} component={Loading} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" options={{ title: "Signal" }} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
