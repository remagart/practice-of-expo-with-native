import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image, Animated, Easing, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function MyTestAnimationScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    fadeinAnimation();
  }, []);

  const fadeinAnimation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeoutAnimation = () => {
    console.log("zzz");
    Animated.timing(fade, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  function renderBar() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#FF00FF", "#00FF00"]}
      >
        <View style={styles.bar} />
      </LinearGradient>
    );
  }

  function renderAnimationBar() {
    return (
      <Animated.View style={{
        opacity: fade,
      }}>
        {renderBar()}
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="123" onPress={fadeoutAnimation} />
      {renderAnimationBar()}

      <Image source={{ uri: "https://kitcat.com.sg/wp-content/uploads/2020/07/Kit-Cat.png" }} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  bar: {
    width: SCREEN_WIDTH,
    height: 30,
  },
  img: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    // position: "absolute",
    // left: 0,
    // top: 0,
  }
});

