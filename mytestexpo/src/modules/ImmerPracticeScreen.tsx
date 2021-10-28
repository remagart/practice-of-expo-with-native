import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function ImmerPracticeScreen () {
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.navigate("Test"); }}>
        <Text> textInComponent </Text>
      </TouchableOpacity>
      <Text> textInComponent </Text>
      <Text> textInComponent </Text>
      <Text> textInComponent </Text>
      <Text> textInComponent </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
