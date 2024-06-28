import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BottomTabNavigation from "./src/navigations/BottomTabNavigation";

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default App;
