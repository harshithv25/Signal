import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Chatlist from "../components/Chatlist";
import db, { auth } from "../firebase";
import faker from "faker";
import { Image } from "react-native";
import { Button } from "react-native-elements";

const ITEM_SIZE = 80;

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(["women", "men"])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const Home = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [chats, setChats] = useState(null);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      }),
    [navigation]
  );

  useLayoutEffect(() => {
    db.collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => setChats(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <Button title="Logout" onPress={() => auth.signOut().then((user) => navigation.replace("Login"))} />
      <Animated.FlatList
        data={chats}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{
          padding: 15,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(255, 255, 255, .7)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                alignItems: "center",
                padding: 15,
                marginBottom: 15,
                borderRadius: 10,
                transform: [{ scale }],
              }}
            >
              <Chatlist id={item.id} chatImg={item.data.name} name={item.data.name} />
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});
