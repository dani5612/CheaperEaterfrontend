import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../screens/index";
import ListView from "../screens/listView";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Index} />
      <Stack.Screen name="Search" component={ListView} />
    </Stack.Navigator>
  );
};
export default Pages;
