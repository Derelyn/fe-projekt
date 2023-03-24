import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a very simple homepage</Text>
      <Link to="/login" style={styles.link}>
        <Text style={styles.linkText}>Login</Text>
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
  }
});

export default Home;
