import React, { useState } from "react";
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import jwt from "jwt-decode";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await Axios.post("/login", { username, password });
      if (response.data) {
        AsyncStorage.setItem("appToken", response.data.token);
        AsyncStorage.setItem("appuUsername", response.data.username);
        const tokenDecoded = jwt(response.data.token);

        props.setTokenContent(prev => prev.concat({ tokenDecoded }));
        props.setLoggedIn(true);
        props.navigation.navigate("Tasks");
      } else {
        console.log("Incorrect username / password.");
      }
    } catch (e) {
      console.log("Problem connect to backend.");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <TextInput style={styles.textInput} placeholder="username" onChangeText={setUsername} value={username} />
      <TextInput style={styles.textInput} placeholder="password" secureTextEntry={true} onChangeText={setPassword} value={password} />
      <TouchableHighlight style={styles.link} onPress={handleSubmit}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableHighlight>
      {/* len testovaci button */}
      <Link to="/tasks" style={{ paddingTop: 20 }}>
        <Text>Tasks</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  link: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10
  }
});

export default Login;
