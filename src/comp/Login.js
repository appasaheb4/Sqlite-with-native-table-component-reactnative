import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  WebView
} from "react-native";
import CreateTables from "../../src/res/manager/CreateTables";
import { localDB } from "../../src/res/constants/constants";
import SQLite from "react-native-sqlite-storage";
var db = SQLite.openDatabase(
  localDB.dbName,
  "1.0",
  "reactDemo Database",
  200000
);

  

export default class Login extends Component {
  constructor(props) {
    super(props);
    state = {
      fullName: "",
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }


  login() {
    db.transaction(function(txn) {
      txn.executeSql(
        "INSERT INTO " +
          localDB.tableName.tblLogin +
          " (date,user_id,code,session_token) VALUES (:date,:user_id,:code,:session_token)",
        ["2018-09-27", 1, "101", "s12345"]  
      );
      //TODO: Insert they student vlaues in sqlite database
      txn.executeSql(
        "INSERT INTO " +
          localDB.tableName.tblStudent +
          " (date,name,mark) VALUES (:date,:name,:mark)",
        ["2018-09-27","Sagar", "75"]  
      );
      txn.executeSql(
        "INSERT INTO " +
          localDB.tableName.tblStudent +
          " (date,name,mark) VALUES (:date,:name,:mark)",
        ["2018-10-03","Sachin", "80"]  
      );
    });
    console.log("insert values success");
    this.props.navigation.navigate("Home");
  }


  render() {
    return (
      <ScrollView style={{ backgroundColor: "#000000" }}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/male-user/ultraviolet/50/3498db"
              }}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Full name"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={fullName => this.setState({ fullName })}
            />
          </View>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.signupButton]}
            onPress={this.login}
          >
            <Text style={styles.signUpText}>Login</Text>
          </TouchableHighlight>
        </View>
        <CreateTables />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    marginTop: 20
  },  
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    margin: 10,
    borderBottomWidth: 1,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainerRadioButton: {
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputsRadio: {
    height: 50,
    marginLeft: 16,
    paddingTop: 10,
    borderBottomColor: "#000000",
    backgroundColor: "#000000",

    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  signupButton: {
    backgroundColor: "#FF4DFF"
  },
  signUpText: {
    color: "white"
  }
});
