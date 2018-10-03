import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Container, Button } from "native-base";
import { Table, Row, Rows } from "react-native-table-component";
import { Icon } from "react-native-elements";
import { localDB } from "../../src/res/constants/constants";
import SQLite from "react-native-sqlite-storage";
var db = SQLite.openDatabase(localDB.dbName, "1.0", "MyRx Database", 200000);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableTitle: ["Date", "Name", "Mark", "Edit"],
      tableData: [[]],
      widthArr: [100, 150, 70, 50]
    };
  }

  componentWillMount() {
    this.connection_getData();
  }

  connection_getData() {
    this.setState({
      tableData: [[]]
    });
    const editIcon = values => (
      <TouchableOpacity onPress={() => this.editValues(values)}>
        <Icon name="edit" size={25} color="#AA0000" />
      </TouchableOpacity>
    );
    var temp = [[]];
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM " + localDB.tableName.tblStudent,
        [],
        (tx, results) => {
          // Get rows with Web SQL Database spec compliance.
          var len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var joined = this.state.tableData.concat([
                [
                  results.rows.item(i).date,
                  results.rows.item(i).name,
                  results.rows.item(i).mark,
                  editIcon(results.rows.item(i).id)
                ]
              ]);
              this.setState({ tableData: joined });
            }
          }
        }
      );
    });
  }

  //TODO: Edit Values show
  editValues(values) {
    Alert.alert("User id =" + values);
  }

  render() {
    return (
      <Container style={styles.container}>
          <Container style={styles.container}>
        <View style={styles.gridSystems}>
          <Table
            state={styles.tableStyle}
            borderStyle={{
              borderWidth: 2,
              borderColor: "#000000",
              alignItems: "center"
            }}
          >
            <Row
              data={this.state.tableTitle}
              style={styles.head}
              widthArr={this.state.widthArr}
              textStyle={[styles.text, styles.tableTitle]}
            />
            <Rows
              data={this.state.tableData}
              widthArr={this.state.widthArr}
              textStyle={[styles.text, styles.tableData]}
            />
          </Table>
        </View>
      </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff"
  },
  gridSystems: {
    flex: 1
  },
  tableStyle: {
    width: Dimensions.get("screen").width
  },
  head: {
    height: 45,
    backgroundColor: "gray"
  },
  tableTitle: {
    color: "#ffffff",
    fontSize: 18
  },
  tableData: {
    height: "auto",
    paddingTop: 10
  },
  
});


