import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Image, Animated, Easing, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function MyTestAnimationScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const move = useRef(new Animated.Value(-8)).current;
  
  useEffect(() => {
    moveAnimation();
  }, []);

  const moveAnimation = () => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.stagger(10000,[
        Animated.timing(move, {
          toValue: SCREEN_HEIGHT,
          duration: 15000,
          easing: Easing.linear,
          useNativeDriver: true,
        }), 
        Animated.timing(fade, {
          toValue: 0,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ]).start();
  };

  function renderBar() {
    return (
      <LinearGradient
        style={styles.bar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#000024", "#00fff2"]}
      >
        <View style={styles.bar} />
      </LinearGradient>
    );
  }

  function renderAnimationBar() {
    return (
      <Animated.View style={{
        zIndex: 100,
        opacity: fade,
        transform: [
          { translateY: move },
        ]
      }}>
        {renderBar()}
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      {renderAnimationBar()}

      <Image source={{ uri: "https://kitcat.com.sg/wp-content/uploads/2020/07/Kit-Cat.png" }} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  bar: {
    width: SCREEN_WIDTH - 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
  },
  img: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    left: 0,
    top: 0,
  }
});

