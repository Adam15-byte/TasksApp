import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  interpolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { SIZES } from "../../assets/consts/SIZES";

const ListItem = ({ item, handleRemovingTasks }) => {
  const translateX = useSharedValue(0);
  // Animated style for the horizontal tab displaying task text
  const swipeStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });
  // Animated style for the trash icon that is dependant on value of translateX
  const trashIconOpacityAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, [-35, -65], [0, 1]);
    const scale = interpolate(translateX.value, [-35, -56], [0, 1]);
    return { opacity, transform: [{ scale }] };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      translateX.value = Math.min(Math.max(event.translationX, -71), 0);
      console.log(event.translationX);
    },
    onEnd: (event) => {},
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.taskCell, swipeStyle]}>
          <Text style={styles.taskTextInCell}>{item.item.text}</Text>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[styles.trashIconContainer, trashIconOpacityAnimation]}
      >
        <TouchableOpacity onPress={() => handleRemovingTasks(item.item.id)}>
          <Entypo name="trash" size={24} color="red" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  taskTextInCell: {
    marginLeft: 25,
  },
  trashIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
  },
  taskCell: {
    width: SIZES.ITEM_WIDTH,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
    zIndex: 90,
  },
});
