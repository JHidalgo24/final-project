import React from "react";

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Card, Text } from "@ui-kitten/components";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {WatchlistScreen} from "./WatchlistScreen";
import {WatchedScreen} from "./WatchedScreen";

const Tab = createMaterialTopTabNavigator();

const MyAnimeLists = (props) => {
  return (
      <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#000",
            tabBarStyle: { backgroundColor: "#FFC1D3" },
            tabBarIndicatorStyle: {
              backgroundColor: "#CCC",
            },
          }}
      >
        <Tab.Screen
            name="Watchlist"
            children={() => (
                <WatchlistScreen
                    user={props.user}
                    getUser={props.getUser}
                />
            )}
        />
        <Tab.Screen
            name="Watched"
            children={() => (
                <WatchedScreen
                    user={props.user}
                    getUser={props.getUser}
                ></WatchedScreen>
            )}
        ></Tab.Screen>
      </Tab.Navigator>
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

export { MyAnimeLists };
