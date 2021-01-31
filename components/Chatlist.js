import React from "react";
import { View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { auth } from "../firebase";

const Chatlist = ({ id, enterChat, chatImg, name, lastMessage }) => {
  return (
    <>
      <Avatar
        rounded
        size="medium"
        source={{ uri: chatImg || `https://avatar.oxro.io/avatar.svg?name=${auth.currentUser.displayName}&background=0099cc&length=1` }}
      />
      <ListItem.Content style={{ marginLeft: 10 }}>
        <ListItem.Title style={{ fontWeight: "800" }}>
          <Text>{name}</Text>
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessage}
        </ListItem.Subtitle>
      </ListItem.Content>
    </>
  );
};

export default Chatlist;

const styles = StyleSheet.create({
  container: {},
});
