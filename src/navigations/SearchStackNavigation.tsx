import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Search from "../screens/Search";
import MovieDetail from "../screens/MovieDetail";
import CategorySearchResult from "../components/search/CategorySearchResult";

const Stack = createNativeStackNavigator();
const SearchStackNavigation = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            title: "Movie Detail",
          }}
        />
        <Stack.Screen
          name="CategorySearchResult"
          component={CategorySearchResult}
          options={{
            title: "Category Search Result",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default SearchStackNavigation;
