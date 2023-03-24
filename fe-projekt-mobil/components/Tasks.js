import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Link } from "react-router-native";
import axios from "axios";

//dummy data
// const data = [
//   { num: 1, title: "blah", description: "blah blah" },
//   { num: 2, title: "blah", description: "blah blah" },
//   { num: 3, title: "blah", description: "blah blah" },
//   { num: 4, title: "blah", description: "blah blah" },
//   { num: 5, title: "blah", description: "blah blah" }
// ];

const Tasks = props => {
  const [tasks, setTasks] = useState([]);
  const [select, setSelect] = useState("new");

  var i = 1;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`/tasks?filter=${select}`);
        setTasks(response.data);
      } catch (e) {
        console.log("Problem with rendering tasks.");
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = () => {
    const areYouSure = window.confirm("Do you really want to delete this post?");
    if (areYouSure) {
      async function fetchPost() {
        try {
          await axios.delete(`/tasks/${props.taskId}`, { data: { token: AsyncStorage.getItem("appToken") } });
          props.setMessage("Task deleted.");
        } catch (e) {
          console.log("Problem with delete task.");
        }
      }
      fetchPost();
    }
  };

  const data = [
    tasks.map(task => {
      return (
        <View key={task._id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text>{i++}</Text>
          <Text>{task.title}</Text>
          <Text>{task.body}</Text>
          {props.tokenContent.lvl === 3 && (
            <TouchableOpacity onPress={handleDelete}>
              <Text>X</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    })
  ];

  const item = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 50, minHeight: 30, backgroundColor: "#d3f2eb", marginTop: 1, marginBottom: 1 }}>
          <Text>{item.num}</Text>
        </View>
        <View style={{ width: 105, backgroundColor: "#d3f2eb", paddingRight: 5, marginTop: 1, marginBottom: 1 }}>
          <Text>{item.title}</Text>
        </View>
        <View style={{ width: 205, backgroundColor: "#d3f2eb", paddingRight: 5, marginTop: 1, marginBottom: 1 }}>
          <Text>{item.description}</Text>
        </View>
        <View style={{ width: 20, backgroundColor: "#d3f2eb", marginTop: 1, marginBottom: 1 }}>
          {props.tokenContent.lvl === 3 && (
            <TouchableOpacity onPress={handleDelete} style={{ backgroundColor: "red", borderRadius: 4 }}>
              <Text style={{ color: "white", textAlign: "center" }}>X</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <View style={styles.container}>
        {props.tokenContent.lvl === 3 && (
          <Link to="/tasks/new" style={styles.link}>
            <Text style={styles.linkText}>Add task</Text>
          </Link>
        )}
        <Text>{"\n"}</Text>
        {/* len testovaci button */}
        <Link to="/login" style={styles.link}>
          <Text style={styles.linkText}>Back to Login</Text>
        </Link>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Show me</Text>
        <Picker selectedValue={select} style={styles.picker} onValueChange={itemValue => setSelect(itemValue)}>
          <Picker.Item label="New" value="new" />
          <Picker.Item label="Finished" value="finished" />
        </Picker>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 50, minHeight: 30, backgroundColor: "#fbeea4" }}>
            <Text>num</Text>
          </View>
          <View style={{ width: 105, backgroundColor: "#fbeea4", paddingRight: 5 }}>
            <Text>title</Text>
          </View>
          <View style={{ width: 205, backgroundColor: "#fbeea4", paddingRight: 5 }}>
            <Text>description</Text>
          </View>
          <View style={{ width: 20, backgroundColor: "#fbeea4" }}></View>
        </View>
        <FlatList data={data} renderItem={item} keyExtractor={(item, index) => index.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70
  },
  text: {
    fontSize: 18
  },
  link: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10
  },
  picker: {
    width: 150,
    height: 50,
    backgroundColor: "#ededed",
    color: "black"
  }
});

export default Tasks;
