import React, { useState } from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Axios from "axios";

const NewTask = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await Axios.post(`/tasks`, { title, body, id: Date.now() }); //id: Date.now() vytvori random id
      props.setTaskId(response.data.id);
      props.setMessage("Task created.");
    } catch (e) {
      console.log("Problem connect to backend.");
    }
    setTitle("");
    setBody("");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Title</Text>
        <TextInput style={styles.input} onChangeText={text => setTitle(text)} value={title} placeholder="New appointment" autoFocus />
      </View>
      <View>
        <Text>Content</Text>
        <TextInput style={styles.input} onChangeText={text => setBody(text)} value={body} placeholder="Lorem ipsum." multiline />
      </View>
      <TouchableHighlight style={styles.link} onPress={handleSubmit}>
        <Text style={styles.linkText}>Add new task</Text>
      </TouchableHighlight>
      <View style={styles.back}>
        <Link to="/tasks">
          <Text>&larr; Back to tasks.</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10
  },
  link: {
    backgroundColor: "#007bff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  back: {
    marginTop: 20,
    alignSelf: "flex-start"
  }
});

export default NewTask;
