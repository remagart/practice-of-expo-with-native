import React, { useRef, useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Image, Animated, Easing, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function MyTestAnimationScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const move = useRef(new Animated.Value(-8)).current;
  const barWidth = useRef(new Animated.Value(1)).current;
  const rate = (SCREEN_WIDTH + 8) / (SCREEN_WIDTH - 8);
  const [isVisible, setisVisible] = useState(false);
  
  useEffect(() => {
    moveAnimation();
  }, []);

  const fadeIn = useMemo(() => {
    return Animated.timing(fade, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const moveIn = useMemo(() => {
    return Animated.timing(move, {
      toValue: SCREEN_HEIGHT + 8,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const fadeout = useMemo(() => {
    return Animated.timing(fade, {
      toValue: 0,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const bigger = useMemo(() => {
    return Animated.timing(barWidth, {
      toValue: rate,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const smaller = useMemo(() => {
    return Animated.timing(barWidth, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  }, []);

  const moveAnimation = () => {
    setisVisible(false);
    Animated.parallel([
      bigger,
      fadeIn,
      Animated.stagger(10000,[
        moveIn,
        Animated.parallel([
          fadeout,
          smaller,
        ])
      ])
    ]).start(() => {
      move.setValue(-8);
      setisVisible(true);
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
      {(isVisible) && (<View style={{ zIndex: 100 }}>
        <Button title="see again?" onPress={moveAnimation}/>
      </View>)}
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
    width: "100%",
    height: 8,
  },
  barLinear: {
    width: SCREEN_WIDTH - 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
  },
  img: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    left: 0,
    top: 0,
  }
});

