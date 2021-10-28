import * as React from "react";
import { StyleSheet, Image } from "react-native";

import { Text, View } from "../../components/Themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImmerPracticeScreen from "../modules/ImmerPracticeScreen";
import Test from "../modules/test";
import Test2 from "../modules/test2";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function TabTwoScreen() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ImmerPracticeScreen" component={ImmerPracticeScreen} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Test2" component={Test2} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
