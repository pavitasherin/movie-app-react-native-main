import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Feather } from "@expo/vector-icons";
import HomeStackNavigation from "./HomeStackNavigation";
import FavoriteStackNavigation from "./FavoriteStackNavigation";
import SearchStackNavigation from "./SearchStackNavigation";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={28} color={color} />
          ),
          headerShown: false,
          title: "Home",
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={28} color={color} />
          ),
          headerShown: false,
          title: "Search",
        }}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={FavoriteStackNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="heart" size={28} color={color} />
          ),
          headerShown: false,
          title: "Favorite",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
