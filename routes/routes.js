import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../screens/index";
import ListView from "../screens/listView";
import Base from "../screens/base";
import AddressDetailsProvider from "../contexts/AddressContext";

const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    <AddressDetailsProvider>
      <NavigationContainer
        linking={{
          config: {
            screens: {
              Home: "",
              Search: "search",
            },
          },
        }}
      >
        <Base>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Index} />
            <Stack.Screen name="Search" component={ListView} />
          </Stack.Navigator>
        </Base>
      </NavigationContainer>
    </AddressDetailsProvider>
  );
};
export default Pages;
