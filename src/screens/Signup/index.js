import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import theme from "../../../theme";
import URL from "./../../../config";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as Device from 'expo-device';

console.log(Device.osBuildId);

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      phone: "",
      password: "",
    };
  }

  CreateAccount = async () => {
    let { email, password, phone } = this.state;
    if (phone === "") {
      showMessage({
        message: "Enter phone number",
        type: "danger",
      });
    } else if (email === "") {
      showMessage({
        message: "Enter email address",
        type: "danger",
      });
    } else if (password === "") {
      showMessage({
        message: "Enter new password",
        type: "danger",
      });
    } else {
      await axios
        .post(
          `https://test.cekuregistracija.lv/ws/signup`,
          {
            userName: email,
            userEmail: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          showMessage({
            message: "Account created successfully",
            type: "success",
          });
          this.props.navigation.navigate("Login");
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
    let { err, phone, password, email } = this.state;
    return (
      <SafeAreaView style={styles._container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text style={styles._welcome}>Welcome to regsiter</Text>
            {/* <Text style={styles._error}>{err}</Text> */}
            <TextInput
              onChangeText={(phone) => this.setState({ phone })}
              placeholder="Phone number"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={phone}
            />
            {/* <Text style={styles._error}>{err}</Text> */}
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              value={email}
            />
            <TextInput
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              value={password}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles._btn}
              onPress={() => this.CreateAccount()}
            >
              <Text style={styles._btn_text}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles._footer}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles._sub_title}>Login</Text>
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
    marginTop: 10,
  },
});
