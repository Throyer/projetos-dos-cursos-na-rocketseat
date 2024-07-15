import "react-native-gesture-handler";

import React, { FC } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Providers from './hooks';
import Routes from "./routes";

const App: FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <Providers>
      <View style={{ backgroundColor: "#312e38", flex: 1 }}>
        <Routes />
      </View>
    </Providers>
  </NavigationContainer>
);

export default App;
