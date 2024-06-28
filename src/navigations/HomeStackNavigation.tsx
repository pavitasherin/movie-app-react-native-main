import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";
import Favorite from "../screens/Favorite";

const Stack = createNativeStackNavigator();
const HomeStackNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            title: "Movie Detail",
          }}
        />
        <Stack.Screen name="Favorite" component={Favorite} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStackNavigation;
