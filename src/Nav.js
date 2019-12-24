import React, {Component} from 'react';
import weather from './index';
import Display from './component/Display';
import MySearch from "./component/MySearch";
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator(
  {
    Home: weather,
    Display: Display,
    Search: MySearch,
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default MyApp = createAppContainer(AppNavigator);