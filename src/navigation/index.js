import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, AddReceipt, Login, Signup, ConfirmReceipt } from "./../screens";
import theme from "../../theme";
const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.white,
            headerTitleStyle: {
              fontFamily: theme.medium,
            },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Register new user",
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.white,
            headerTitleStyle: {
              fontFamily: theme.medium,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "List of registered receipts",
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.white,
            headerTitleStyle: {
              fontFamily: theme.medium,
            },
          }}
        />
        <Stack.Screen
          name="AddReceipt"
          component={AddReceipt}
          options={{
            title: "Add new receipt",
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.white,
            headerTitleStyle: {
              fontFamily: theme.medium,
            },
          }}
        />
        <Stack.Screen
          name="ConfirmReceipt"
          component={ConfirmReceipt}
          options={{
            title: "Confirm receipt",
            headerStyle: {
              backgroundColor: theme.primary,
            },
            headerTintColor: theme.white,
            headerTitleStyle: {
              fontFamily: theme.medium,
            },
          }}
        />
        {/*  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
