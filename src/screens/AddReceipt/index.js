import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import theme from "../../../theme";
import axios from "axios";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";
export default class AddReceipt extends React.Component {
  constructor() {
    super();
    this.state = {
      hasPermission: null,
      url: "",
    };
  }

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  takePicture = async () => {
    this.setState({ url: "" });
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
      this.setState({ url: photo.uri });
      const token = await AsyncStorage.getItem("token");

      // let newForm = new window.FormData();
      const uri = photo.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();

      formData.append("file", {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
      console.log(formData);

      const file = {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      };

      const body = new FormData();
      body.append("file", file);

      fetch("https://test.cekuregistracija.lv/ws/analyse/", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          console.log("---res---->", response);
        })
        .catch(function (error) {
          console.log("--err--->", error);
        });
      // let axiosConfig = {
      //   headers: {
      //     //method:'post',
      // //Accept: "application/json",
      // "Content-Type": "multipart/form-data",
      // Authorization: `Bearer ${token}`,
      //   },
      // };

      // await axios
      //   .post(
      //     "https://test.cekuregistracija.lv/ws/analyse",
      //     formData,
      //     axiosConfig
      //   )

      // .then(function (response) {
      //   console.log("---res---->", response);
      // })
      // .catch(function (error) {
      //   console.log("--err--->", error.response.data);
      // });
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ url: result.uri });

      const uriParts = result.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const token = await AsyncStorage.getItem("token");

      let newForm = new window.FormData();
      newForm.append("file", result);

      console.log(newForm);
      axios({
        method: "POST",
        url: "https://test.cekuregistracija.lv/ws/analyse",
        data: newForm,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      })
        .then(function (response) {
          console.log("---res---->", response);
        })
        .catch(function (error) {
          console.log("--err--->", error.response.data);
        });
    }

    // axios({
    //   method: "post",
    //   url: "http://192.168.147.166:3000/api/notes/upload",
    //   data: file,
    // })
    //   .then((response) => {
    //     // setImage1(response.data.fileUrl);
    //     console.log("image upload successfully", response.data.fileUrl);
    //   })
    //   .then((error) => {
    //     console.log("error riased", error.data);
    //   });
    // }
  };

  render() {
    const { hasPermission, flash, url } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {url === "" ? (
            <Camera
              style={{ flex: 1 }}
              // flashMode={true}
              type={"back"}
              ref={(ref) => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 30,
                }}
              ></View>

              {/* </View> */}
            </Camera>
          ) : (
            <View style={styles._inner_view}>
              <Image source={{ uri: url }} style={styles._selected_image} />
            </View>
          )}
          <View style={styles._footer}>
            <TouchableOpacity onPress={() => this.takePicture()}>
              <FontAwesome5 name="camera" size={30} color="#455A64" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.pickImage()}>
              <FontAwesome name="folder-open" size={30} color="#455A64" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                url !== "" && this.props.navigation.navigate("ConfirmReceipt")
              }
            >
              <Ionicons name="md-checkmark" size={30} color="#455A64" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  _take_pic_btn: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "red",
  },
  buttonContainer: {
    borderColor: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  HeaderContainer: {
    borderColor: "white",
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  _footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.white,
  },
  _inner_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  _selected_image: {
    // flex: 1,
    height: 500,
    width: 300,
    resizeMode: "stretch",
    aspectRatio: 2 / 3,
  },
});
