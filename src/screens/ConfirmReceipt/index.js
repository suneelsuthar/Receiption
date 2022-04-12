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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import theme from "../../../theme";
import axios from "axios";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ConfirmReceipt extends React.Component {
  constructor() {
    super();
    this.state = {
      err: "Please enter correct phone number",
      orgNum: "",
      receiptNum: "",
      cacheNum: "",
      sum: "",
      date: "",
      phone: "",
      email: "",
    };
  }

  PostReceipt = async () => {
    let { orgNum, receiptNum, cacheNum, sum, date, phone, email } = this.state;
    if (orgNum === "") {
      showMessage({
        message: "Enter organization number",
        type: "danger",
      });
    } else if (receiptNum === "") {
      showMessage({
        message: "Enter receipt number",
        type: "danger",
      });
    } else if (cacheNum === "") {
      showMessage({
        message: "Enter cache register number",
        type: "danger",
      });
    } else if (sum === "") {
      showMessage({
        message: "Enter receipt sum",
        type: "danger",
      });
    } else if (phone === "") {
      showMessage({
        message: "Enter phone number",
        type: "danger",
      });
    } else if (email === "") {
      showMessage({
        message: "Enter email address",
        type: "danger",
      });
    } else {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      let axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      await axios
        .post(
          `https://test.cekuregistracija.lv/ws/receipt`,
          {
            vatNo: orgNum,
            receiptNo: receiptNum,
            receiptSum: sum,
            mashineNo: cacheNum,
            receiptDate: date,
          },

          axiosConfig
        )
        .then((response) => {
          console.log(response.data);
          showMessage({
            message: "Receipt uploaded successfully",
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
    let {
      keyboardFocus,
      err,
      orgNum,
      receiptNum,
      cacheNum,
      sum,
      date,
      phone,
      email,
    } = this.state;
    return (
      <SafeAreaView style={styles._container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, margin: 5 }}>
            <TextInput
              onChangeText={(orgNum) => this.setState({ orgNum })}
              placeholder="Organization number"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={orgNum}
            />
            <TextInput
              onChangeText={(receiptNum) => this.setState({ receiptNum })}
              placeholder="Receipt number"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={receiptNum}
            />
            <TextInput
              onChangeText={(cacheNum) => this.setState({ cacheNum })}
              placeholder="Cache register number"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={cacheNum}
            />
            <TextInput
              onChangeText={(sum) => this.setState({ sum })}
              placeholder="Receipt sum"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={sum}
            />
            <TextInput
              onChangeText={(date) => this.setState({ date })}
              placeholder="Receipt date"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              value={date}
            />
            <TextInput
              onChangeText={(phone) => this.setState({ phone })}
              placeholder="Mobile phone number"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={phone}
            />
            <TextInput
              onChangeText={(email) => this.setState({ email })}
              placeholder="E-mail address"
              style={styles._text_input}
              placeholderTextColor={theme.greyLight}
              keyboardType="number-pad"
              value={email}
            />
          </View>
          <View style={styles._footer}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={30}
                color="#455A64"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.PostReceipt()}>
              <Ionicons name="md-checkmark" size={30} color="#455A64" />
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
    margin: 10,
    elevation: 2,
  },

  _text_input: {
    fontFamily: theme.medium,
    color: theme.black,
    borderWidth: 1,
    padding: 10,
    height: 60,
    borderColor: "#455A64",
    borderRadius: 4,
    marginVertical: 4,
  },

  _sub_title: {
    alignSelf: "center",
    marginTop: 30,
    fontFamily: theme.medium,
    fontSize: 17,
  },
  _footer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  _error: {
    color: theme.red,
    fontFamily: theme.regular,
    padding: 2,
    fontSize: 12,
  },
});
