import React, { useLayoutEffect } from "react";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { auth } from "../firebase";

const Loading = ({ navigation }) => {
  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setInterval(() => {
          navigation.replace("Home");
        }, [1000]);
      } else {
        navigation.replace("Login");
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <Image
        raised
        source={{
          uri:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-rOK8A_DIu2A%2FXIdsu9wvQ2I%2FAAAAAAAABT8%2Fo_SR9oM-GVUwQlbxD9dmM2dk9ssxaz_nQCLcBGAs%2Fs1600%2FIMG_20190312_151927.png&f=1&nofb=1",
        }}
        style={{ height: 200, width: 200 }}
      />
      <Text style={{ marginTop: 10 }}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
