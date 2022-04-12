import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import theme from "../../../theme";
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onPress, title, disabled } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.5}
        onPress={() => !disabled && onPress()}
        style={[
          styles._container,
          { backgroundColor: disabled ? theme.greyLight : theme.btnColor },
        ]}
      >
        <Text style={styles._btn_text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  _container: {
    backgroundColor: theme.btnColor,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  _btn_text: {
    fontFamily: theme.bold,
    color: theme.white,
  },
});
