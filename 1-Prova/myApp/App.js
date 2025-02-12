import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./NavigationService"; // Importa navigationRef
import HomeScreen from "./screens/Homepage";
import ProfileScreen from "./screens/Profile";
import MenuDetailScreen from "./screens/MenuDetail";
import DeliveryScreen from "./screens/Delivery";
import EditProfileCardScreen from "./screens/EditProfileCard";
import EditProfileDataScreen from "./screens/EditProfileData";
import Prova from "./screens/Prova";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false} }>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
        <Stack.Screen name="EditProfileCard" component={EditProfileCardScreen} />
        <Stack.Screen name="EditProfileData" component={EditProfileDataScreen} />
        <Stack.Screen name="Prova" component={Prova} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


