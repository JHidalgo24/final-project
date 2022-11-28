import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "@ui-kitten/components";
import { db } from "../../configs/firebaseConfig";
import { WatchlistAnimeCard } from "../Cards/WatchlistAnimeCard";
import { useIsFocused } from "@react-navigation/native";

let WatchlistScreen = (props) => {
  const isFocused = useIsFocused();

  let [watchlistItems, setWatchlistItems] = useState([]);
  let [currentWatchList, setCurrentWatchlist] = useState([]);
  let [currentItems, setCurrentItems] = useState(5);
  let [isVisible, setIsVisible] = useState(false);
  let [tooMany, setTooMany] = useState(false);
  let [tooLittle, setTooLittle] = useState(false);

  let renderThingy = ({ item }) => {
    return (
      <View>
        <WatchlistAnimeCard
          getWatchlist={getWatchlist}
          user={props.user}
          item={item}
        ></WatchlistAnimeCard>
      </View>
    );
  };

  let getWatchlist = async () => {
    setIsVisible(true);
    let watchlistStuff = await db
      .collection("Users")
      .doc(props.user.uid)
      .collection("watchlist")
      .get()
      .then((yo) => {
        return yo.docs;
      });

    let tempArray = watchlistStuff.map((doc) => doc);

    tempArray = tempArray.sort((a,b) => {
      const nameA = a.data().title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.data().title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;})

    let clone = tempArray.slice(0, 5);
    await setCurrentWatchlist(clone);
    await setWatchlistItems(tempArray);
    setIsVisible(false);
  };

  let getNextPage = () => {
    let pastItem = currentItems;
    let newNumber = currentItems + 5;

    if (pastItem >= watchlistItems.length) {
      setTooMany(true);
    } else {
      setCurrentItems(newNumber);
      let newItems = watchlistItems.slice(pastItem, newNumber);
      setCurrentWatchlist(newItems);
      setCurrentItems(currentItems + 5);
    }
  };

  let getPreviousPage = () => {
    let pastItem = currentItems - 5;

    if (pastItem === 0) {
      setTooLittle(true);
    } else {
      let newNumber = currentItems - 10;
      setCurrentItems(newNumber);
      let newItems = watchlistItems.slice(newNumber, pastItem);
      setCurrentWatchlist(newItems);
      setCurrentItems(currentItems - 5);
    }
  };

  useEffect(() => {
    setCurrentItems(5);
    getWatchlist();
  }, [isFocused]);

  if (isVisible) {
    return (
      <ImageBackground
        style={{
          flexGrow: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
        source={require("../../assets/wallpaper.jpg")}
      >
        <ActivityIndicator size={100} color={"#FFC1D3"}></ActivityIndicator>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={{ flexGrow: 1 }}
        source={require("../../assets/wallpaper.jpg")}
      >
        <ScrollView>
          {isVisible ? null : null}
          {isFocused && !isVisible ? (
            <View>
              <FlatList
                windowSize={10}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={10}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={currentWatchList}
                renderItem={renderThingy}
              ></FlatList>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                {currentItems - 5 === 0 ? null : (
                  <TouchableOpacity
                    onPress={() => getPreviousPage()}
                    style={styles.buttonLeftThingy}
                  >
                    <Text>Previous Page</Text>
                  </TouchableOpacity>
                )}

                {currentItems >= watchlistItems.length ? null : (
                  <TouchableOpacity
                    onPress={() => getNextPage()}
                    style={styles.buttonRightThingy}
                  >
                    <Text>Next Page</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
  bigText: {
    color: "#000",
    marginTop: 30,
    fontFamily: "",
  },
  buttonRightThingy: {
    marginHorizontal: 20,
    backgroundColor: "#FFC1D3",
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  buttonLeftThingy: {
    marginHorizontal: 20,
    backgroundColor: "#FFC1D3",
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  activityIndicatorThing: {
    justifyContent: "center",
    alignContent: "center",
  },
});

export { WatchlistScreen };
