import React, { useState } from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Modal } from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../../configs/firebaseConfig";

const WatchlistAnimeCard = (props) => {
  let [isVisible, setIsVisible] = useState(false);

  let removeAnime = async () => {
    await db
      .collection("Users")
      .doc(props.user.uid)
      .collection("watchlist")
      .doc(props.item.id)
      .delete();
    await props.getWatchlist();
  };

  return (
    <View>
      <Card
        style={{ margin: 10, width: "95%", borderRadius: 25, borderWidth: 2 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containCenter}>
            <Image
              resizeMethod={"scale"}
              style={styles.postImageAvatar}
              source={{
                uri: `${props.item.data().images.jpg.large_image_url}`,
              }}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}
                style={{
                  backgroundColor: "#FFC1D3",
                  borderRadius: 10,
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ padding: 10 }}>
                  <MaterialCommunityIcons
                    size={25}
                    name="information-outline"
                  />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  removeAnime();
                }}
                style={{
                  backgroundColor: "#FFC1D3",
                  borderRadius: 10,
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text style={{ padding: 10 }}>
                  <MaterialCommunityIcons size={25} name="delete-outline" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <SafeAreaView style={{ width: "60%" }}>
            <Text
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexShrink: 1,
                fontWeight: "bold",
                fontSize: 17,
              }}
              adjustsFontSizeToFit={true}
            >
              {props.item.data().title}
            </Text>
          </SafeAreaView>
        </View>
      </Card>

      <Modal
        onBackdropPress={() => setIsVisible(false)}
        backdropStyle={styles.backdrop}
        visible={isVisible}
      >
        <ScrollView>
          <Card
            onPress={() => {
              setIsVisible(false);
            }}
            style={{
              margin: 10,
              width: "95%",
              borderRadius: 25,
              borderWidth: 2,
            }}
          >
            <View stlye={{ flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Synopsis{" "}
              </Text>
            </View>
            <Text style={{ padding: 15 }}>{props.item.data().synopsis}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}
              style={{
                backgroundColor: "#FFC1D3",
                borderRadius: 10,
                marginVertical: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </Modal>
    </View>
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
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    maxHeight: "100%",
  },
});

export { WatchlistAnimeCard };
