import React, { useRef, useEffect, useMemo } from "react";
import { Text, View, StyleSheet, Dimensions, Image, Animated, Easing, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const IMG_W = 200;
const IMG_H = 200 * (1379 / 1220);
const MOVE_START = 60 - 8;
const MOVE_END = MOVE_START + IMG_H + 8 + 8;
const BAR_INIT_WIDTH = 100;
const BAR_END_WIDTH = IMG_W + 16;


export default function MyTestAnimationScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const move = useRef(new Animated.Value(MOVE_START)).current;
  const barWidth = useRef(new Animated.Value(1)).current;
  const rate = (BAR_END_WIDTH) / (BAR_INIT_WIDTH);
  
  useEffect(() => {
    moveAnimation();
  }, []);

  const fadeIn = useMemo(() => {
    return Animated.timing(fade, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const moveIn = useMemo(() => {
    return Animated.timing(move, {
      toValue: MOVE_END,
      duration: 2000,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    });
  }, []);

  const fadeout = useMemo(() => {
    return Animated.timing(fade, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const bigger = useMemo(() => {
    return Animated.timing(barWidth, {
      toValue: rate,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const smaller = useMemo(() => {
    return Animated.timing(barWidth, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const moveAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        bigger,
        fadeIn,
      ]),
      Animated.stagger(1800,[
        moveIn,
        Animated.sequence([
          Animated.delay(200),
          fadeout,
        ])
      ])
    ]).start(() => {
      move.setValue(MOVE_START);
      barWidth.setValue(1);
      moveAnimation();
    });
  };

  function renderBar() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#000024", "#00fff2"]}
      >
        <View style={styles.bar} />
      </LinearGradient>
    );
  }

  function renderAnimationBar() {
    return (
      <Animated.View style={[styles.barLinear,{
        zIndex: 100,
        opacity: fade,
        transform: [
          { translateY: move },
          { scaleX: barWidth }
        ]
      }]}>
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
    alignItems: "center"
  },
  bar: {
    width: "100%",
    height: 4,
  },
  barLinear: {
    width: BAR_INIT_WIDTH,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  img: {
    width: IMG_W,
    height: IMG_H,
    position: "absolute",
    top: 60,
  }
});

