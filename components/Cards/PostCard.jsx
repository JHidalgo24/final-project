import React, { useEffect, useState } from "react";

import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";

const PostCard = (props) => {
  let [color, setColor] = useState("#FFC1D3");
  let colorArray = ["#FFC1D3", "#9DE7E5", "#DCB6D5", "#B3B3F1", "#CEC2FF"];
  useEffect(() => {F
    let number = Math.floor(Math.random() * 5);

    setColor(colorArray[number]);
  }, []);

  return (
    <Card
      style={{
        margin: 10,
        width: "95%",
        borderRadius: 25,
        borderColor: color,
        borderWidth: 2,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.containCenter}>
          <Image
            style={[styles.postImageAvatar, { borderColor: color }]}
            source={{ uri: props.item.userImage }}
          ></Image>
        </View>
        <View style={{ width: "75%" }}>
          <Text category={"h6"}>{props.item.PostTitle}</Text>
          <Text style={{ marginVertical: 10 }}>{props.item.displayName}</Text>
          <Text>{props.item.PostContent}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flexGrow: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    marginHorizontal: 20,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  postImageAvatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 2,
  },
  containCenter: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

export { PostCard };
