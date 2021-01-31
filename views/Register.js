import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [password, setPassword] = useState();
  const [loading, setloading] = useState(false);

  const register = () => {
    let hexCode = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hexCode[Math.floor(Math.random() * 16)];
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || `https://avatar.oxro.io/avatar.svg?name=${name.toUpperCase()}&background=${color}&length=1`,
        });
        navigation.replace("Home");
      })
      .catch((err) => alert(err.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  return (
    <>
      {loading ? (
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={100}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3d5875"
        />
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <StatusBar style="light" />
          <Text h3 style={{ marginBottom: 3, borderBottomWidth: 3, borderBottomColor: "black" }}>
            Register
          </Text>
          <Image
            source={{
              uri:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-rOK8A_DIu2A%2FXIdsu9wvQ2I%2FAAAAAAAABT8%2Fo_SR9oM-GVUwQlbxD9dmM2dk9ssxaz_nQCLcBGAs%2Fs1600%2FIMG_20190312_151927.png&f=1&nofb=1",
            }}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
          <View style={styles.inputContainer}>
            <Input placeholder="Username" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Profile pictureUrl (Optional)" type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
            <Input
              placeholder="Password"
              onSubmitEditing={register}
              type="password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <Button raised containerStyle={styles.buttonStyles} onPress={register} title="Register" type="solid" />
          <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Register;

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
  buttonStyles: {
    width: 200,
    marginTop: 10,
  },
});
