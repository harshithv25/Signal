import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disabled, setdisabled] = useState(false);
  const signin = () => {
    setdisabled(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        navigation.replace("Home");
      })
      .catch((e) => alert(e.message), setdisabled(false));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-rOK8A_DIu2A%2FXIdsu9wvQ2I%2FAAAAAAAABT8%2Fo_SR9oM-GVUwQlbxD9dmM2dk9ssxaz_nQCLcBGAs%2Fs1600%2FIMG_20190312_151927.png&f=1&nofb=1",
        }}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
      </View>
      <Button disabled={disabled} raised containerStyle={styles.button} onPress={signin} title="Login" />
      <Button
        disabled={disabled}
        containerStyle={styles.button}
        onPress={() => {
          navigation.navigate("Register");
        }}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
