import React, { Component } from "react";
import { StyleSheet, Alert,Text } from "react-native";
import { Container } from "native-base";

export default class View1 extends Component {
  constructor(props) {
    super(props);
  }

    

  render() {
    return (
      <Container style={styles.container}>
      <Text style={{marginTop:20}}>View 1</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});  
