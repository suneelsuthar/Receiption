import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../theme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount = async () => {
    this.getReciptionData();
    this.props.navigation.addListener("focus", () => {
      this.getReciptionData();
    });
  };

  getReciptionData = async () => {
    const token = await AsyncStorage.getItem("token");
    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`https://test.cekuregistracija.lv/ws/receipt`, axiosConfig)
      .then(async (response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.data.message);
      });
  };

  render() {
    let { data } = this.state;
    return (
      <View style={styles._container}>
        <ScrollView>
          {data.length !== 0 ? (
            data.map((val, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={styles._receipt}
                  activeOpacity={0.5}
                >
                  <Text style={styles._org}>
                    Organization Number: {val.vatNo}
                  </Text>
                  <Text style={styles._text}>
                    Receipt sum: {val.receiptSum}
                  </Text>
                  <Text style={styles._text}>
                    Receipt date: {val.receiptDate}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles._emptylist}>No receiption available!</Text>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles._circle}
          onPress={() => this.props.navigation.navigate("AddReceipt")}
        >
          <Ionicons name="md-add" size={44} color={theme.white} />
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  _container: {
    flex: 1,
    // padding:5
  },
  _org: {
    fontFamily: theme.medium,
    fontSize: 18,
  },
  _text: {
    fontFamily: theme.medium,
    color: theme.grey,
  },
  _receipt: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: theme.greyLight,
  },
  _circle: {
    backgroundColor: theme.primary,
    height: 70,
    width: 70,
    borderRadius: 100,
    elevation: 10,
    position: "absolute",
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  _emptylist: {
    alignSelf: "center",
    fontFamily: theme.medium,
    color: "black",
    marginTop: 50,
  },
});
