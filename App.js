import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { SIZES, width, height } from "./assets/consts/SIZES";
import ListItem from "./src/components/ListItem";

export default function App() {
  const [input, setInput] = useState("");
  const [tasksList, setTasksList] = useState([]);

  // Function to save state from TextInput
  const handleChangeInput = useCallback(
    (newInput) => {
      setInput((prevState) => newInput);
    },
    [input]
  );
  // Function to clear Input field after clicking to add a new task
  const clearInput = useCallback(() => {
    setInput("");
  }, [input]);

  // Function to add a new element to the Array of tasks
  const handleAddingTaks = useCallback(
    (newTask) => {
      if (newTask === "") {
        null;
      } else {
        setTasksList([...tasksList, { id: Math.random(), text: newTask }]);
      }
    },
    [tasksList]
  );

  // Function to remove a specific task from the Array of tasks
  const handleRemovingTasks = useCallback(
    (id) => {
      const filteredArray = tasksList.filter((item) => {
        return item.id !== id;
      });
      setTasksList(filteredArray);
      console.log("filtered");
    },
    [tasksList]
  );

  return (
    // Everything wraped in Touchable to enable dissmising Keyboard upon pressing anywhere on the screen
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Tasks</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* TextInput Container used to type in new tasks */}
          <View style={styles.textInputContainer}>
            <Entypo
              name="pencil"
              size={24}
              color="black"
              style={styles.textInputIcon}
            />
            <TextInput
              placeholder="Add new task"
              style={styles.textInputWindow}
              value={input}
              onChangeText={(text) => handleChangeInput(text)}
            />
          </View>
          {/* Button used to add new tasks */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              handleAddingTaks(input);
              clearInput();
            }}
          >
            <Entypo name="add-to-list" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.flatListContainer}>
          {/* Display the list of tasks */}
          <FlatList
            data={tasksList}
            renderItem={(item) => (
              <ListItem item={item} handleRemovingTasks={handleRemovingTasks} />
            )}
            contentContainerStyle={{
              width: width,
              alignItems: "center",
              marginVertical: 10,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: height,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: 70,
    marginLeft: 50,
    width: width,
  },
  headerText: {
    fontSize: 40,
    letterSpacing: 2,
    fontWeight: "700",
  },
  inputContainer: {
    width: SIZES.ITEM_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  textInputContainer: {
    width: "80%",
    height: 60,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
  },
  sendButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 5 },
  },
  textInputWindow: {
    width: "80%",
  },
  textInputIcon: {
    marginHorizontal: 15,
    alignSelf: "center",
  },
  flatListContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    alignSelf: "center",
    width: width,
  },
});
