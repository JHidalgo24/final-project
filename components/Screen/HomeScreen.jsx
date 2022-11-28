import React from "react";

import {Image, ImageBackground, ScrollView, StyleSheet, View,} from "react-native";
import {Card, Text} from "@ui-kitten/components";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require("../../assets/wallpaper.jpg")}>
      <ScrollView>
        <View>
          <Text
            style={{ textAlign: "center", color: "#718FE6", padding: 20 }}
            category="h4"
          >
            Welcome to my Anime Watchlist App
          </Text>

          <Image
            source={require("../../assets/anya-pointing-at-tv.jpg")}
            style={{
              height: 300,
              flex: 1,
              marginHorizontal: 10,
              width: null,
              borderRadius: 25,
            }}
          ></Image>
          <Card style={styles.card}>
            <Text
              style={{ textAlign: "center", color: "#7999F5" }}
              category="h5"
            >
              About
            </Text>

            <Text style={{ textAlign: "center" }} category="h6">
              Here you will be able to find cool new animes to watch and add
              them to your own watchlist to keep track. You can also mark your
              animes as already watched.
            </Text>
          </Card>
          <Image
            source={require("../../assets/anime-watching-tv.jpeg")}
            style={{
              height: 300,
              flex: 1,
              marginHorizontal: 10,
              width: null,
              borderRadius: 25,
            }}
          ></Image>
          <Card style={styles.card}>
            <Text
              style={{ textAlign: "center", color: "#7999F5" }}
              category="h5"
            >
              Features
            </Text>

            <Text style={{ textAlign: "center" }} category="h6">
              In the app you should be able to sign up, add items to your
              watchlist, and even simply search up basic information about the
              anime. The API being used is Jikan V4 API.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "American Typewriter",
  },
  cardTitle: {
    marginBottom: 20,
  },
  containerBottom: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  AppBarTitle: {
    color: "#EBEBEB",
    fontWeight: "900",
    fontSize: "25%",
    fontFamily: "American Typewriter",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  card: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 25,
  },
  rowContainer: {
    flexDirection: "row",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
});

export { HomeScreen };
