import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import theme from "../../../theme";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";

const hardwareId = Platform === "ios" ? Device.modelId : Device.osBuildId;
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      err: "Please enter correct phone number",
      email: "",
      password: "",
    };
  }
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("token");
    // if (token) {
    //   this.props.navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Home'}],
    //   });
    //   // this.props.navigation.navigate("Home");
    // }
  };

  Login = async () => {
    let { email, password, phone } = this.state;
    if (email === "") {
      showMessage({
        message: "Please enter correct phone number",
        type: "danger",
      });
    } else {
      await axios
        .post(
          `https://test.cekuregistracija.lv/ws/login`,
          {
            userName: email,
            password: hardwareId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then(async (response) => {
          console.log(response.data);
          await AsyncStorage.setItem("token", response.data.token);
          showMessage({
            message: "Logged in successfully",
            type: "success",
          });
          this.props.navigation.navigate("Home");
        })
        .catch((error) => {
          showMessage({
            message: error.response.data.message,
            type: "danger",
          });
        });
    }
  };
  render() {
    let { keyboardFocus, err, email, password } = this.state;
    return (
      <SafeAreaView style={styles._container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={styles._welcome}>Welcome to login</Text>
            {/* <Text style={styles._error}>{err}</Text> */}
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email Address"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              value={email}
            />

            {/* <TextInput
              onChangeText={(password) => this.setState({ password })}
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              value={password}
              placeholder="Password"
              secureTextEntry
            /> */}
            <TouchableOpacity style={styles._btn} onPress={() => this.Login()}>
              <Text style={styles._btn_text}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles._footer}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles._sub_title}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

let styles = StyleSheet.create({
  _container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.white,
  },

  _text_input: {
    fontFamily: theme.medium,
    color: theme.black,
    borderWidth: 1,
    padding: 10,
    height: 60,
    borderColor: "#000000",
    borderRadius: 4,
    marginTop: 10,
  },

  _btn_text: {
    borderColor: theme.white,
    fontFamily: theme.medium,
    color: theme.white,
    fontSize: 16,
  },
  _btn: {
    backgroundColor: theme.primary,
    fontFamily: theme.medium,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    padding: 10,
    elevation: 1,
    height: 60,
  },
  _welcome: {
    fontFamily: theme.medium,
    marginTop: 5,
    fontSize: 26,
    textAlign: "center",
    padding: 30,
    marginBottom: 70,
  },
  _sub_title: {
    alignSelf: "center",
    marginTop: 30,
    fontFamily: theme.medium,
    fontSize: 17,
  },
  _footer: {
    alignSelf: "center",
  },
  _error: {
    color: theme.red,
    fontFamily: theme.regular,
    padding: 2,
    fontSize: 12,
  },
});
