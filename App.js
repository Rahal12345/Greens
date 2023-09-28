import React, { Component } from "react";
import { View, AsyncStorage, StatusBar } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from "./src/screens/home";
import AddPlant from "./src/screens/addPlant";
import ViewPlant from "./src/screens/viewPlant";

import { database } from "./firebase";

console.disableYellowBox = true;

const MainNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home Screen",
        headerShown: false,
      },
    },
    AddPlantScreen: {
      screen: AddPlant,
      navigationOptions: {
        title: "Add Plant Screen",
        headerShown: false,
      },
    },
    ViewPlantScreen: {
      screen: ViewPlant,
      navigationOptions: {
        title: "View Plant Screen",
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "HomeScreen",
  }
);

const App = createAppContainer(MainNavigator);

const AppContainer = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <App />
    </>
  );
};

export default AppContainer;
