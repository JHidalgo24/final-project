import React, {useEffect, useState} from "react";

import {Image, ImageBackground, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View,} from "react-native";
import {Card, Modal, Text} from "@ui-kitten/components";
import {LoginPage} from "../Fragments/LoginPage";
import {db, firebase} from "../../configs/firebaseConfig";
import {SignupPage} from "../Fragments/SignupPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {useIsFocused} from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

let AccountScreen = (props) => {

    let [modalName, setModalName] = useState(false);
    let [modalImage, setModalImage] = useState(false);
    let [namePicked, setNamePicked] = useState();
    let [imagePicked, setImagePicked] = useState();
    let [signUpError, setSignUpError] = useState();
    let [loginError, setLoginError] = useState();
    let [watchedAnimes, setWatchedAnimes] = useState(0);
    let [watchlistedAnimes, setWatchlistedAnimes] = useState(0);
    let isFocused = useIsFocused();

    let setUserThingy = async () => {
        if (props.user !== null) {
            await getWatchlistLength();
        }
    };

    let getWatchlistLength = async () => {
        setWatchedAnimes("Calculating...");
        setWatchlistedAnimes("Calculating...");

        let watchlistStuff = await db
            .collection("Users")
            .doc(props.user.uid)
            .collection("watchlist")
            .get()
            .then((yo) => {
                return yo.docs;
            });

        setWatchlistedAnimes(watchlistStuff.length);

        let watchedListStuff = await db
            .collection("Users")
            .doc(props.user.uid)
            .collection("watched")
            .get()
            .then((yo) => {
                return yo.docs;
            });

        setWatchedAnimes(watchedListStuff.length);
    };

    useEffect(() => {
        setUserThingy();

        if (props.user !== null) {
            getWatchlistLength();
        }
    }, [isFocused]);

    let LoginWithEmailandPassword = async (email, password) => {
        let provider = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                props.getUser();
                setLoginError(" ");
            })
            .catch((err) => {
                setLoginError(err.message);
            });
    };

    let SignUpWithEmailAndPassword = async (email, password) => {
        let provider = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                props.getUser();
            })
            .catch((err) => {
                setSignUpError(err.message);
            });
    };

    let setDisplayName = async () => {
        const userUpdate = firebase.auth().currentUser;

        await userUpdate.updateProfile({
            displayName: namePicked,
        });

        props.getUser();

        setModalName(!modalName);
    };
    let setImageURL = async () => {


        if (imagePicked !== "") {
            const userUpdate = firebase.auth().currentUser;
            await userUpdate.updateProfile({
                photoURL: imagePicked,
            });

            props.getUser();
        }

        setModalImage(!modalImage);
    };


    let logoutUser = async () => {
        await firebase.auth().signOut();
        await props.getUser();
    };

    if (props.user !== null) {
        return (
            <ImageBackground
                style={{flexGrow: 1}}
                source={require("../../assets/wallpaper.jpg")}
            >
                <SafeAreaView style={styles.containerImage}>
                    <TouchableOpacity
                        style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}
                        onPress={() => {
                            setModalName(!modalName);
                        }}
                    >
                        <Text style={{
                            marginTop: 20,
                            backgroundColor: 'white',
                            paddingVertical: 15,
                            paddingHorizontal: 30,
                            borderRadius: 50,
                            color: '#000',
                            borderWidth: 1,
                            borderColor: '#FFC1D3'
                        }} category={"h3"}>
                            {props.user.displayName === "" ? "Set Name" : props.user.displayName}
                            <MaterialCommunityIcons size={20}
                                                    name="pencil"/>
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{marginTop: 20, marginBottom: 5, color: "#000"}}
                        category="h6"
                    >
                        {props.user.email}
                    </Text>
                    <Image
                        resizeMethod={"resize"}
                        style={styles.avatar}
                        source={{
                            uri: `${props.user.photoURL === "" ? "https://imageio.forbes.com/specials-images/imageserve/5ed6636cdd5d320006caf841/0x0.jpg?format=jpg&width=1200" : props.user.photoURL}`,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setModalImage(!modalImage);
                        }}
                        style={{
                            color: "#FFF",
                            borderRadius: 15,
                            width: 200,
                            marginVertical: 10,
                            textAlign: "center",
                            justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                        }}

                    >
                        <Text
                            style={{
                                marginTop: 0,
                                marginBottom: 30,
                                backgroundColor: 'white',
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                borderRadius: 50,
                                color: '#000',
                                borderWidth: 1,
                                borderColor: '#FFC1D3'
                            }}
                        >
                            Change Image <MaterialCommunityIcons size={20} name="pencil"/>
                        </Text>
                    </TouchableOpacity>

                    <Modal
                        backdropStyle={{backgroundColor: "rgba(0, 0, 0, .85)"}}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        visible={modalImage}
                    >
                        <Card style={{width: "90%", maxWidth: "90%", borderRadius: 20}}>
                            <TextInput
                                onChangeText={(x) => {
                                    setImagePicked(x);
                                }}
                                placeholder={"Change Image URL"}
                                style={{
                                    marginHorizontal: 15,
                                    marginVertical: 10,
                                    minWidth: "90%",
                                    maxWidth: "90%",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                }}
                            ></TextInput>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 40,
                                }}
                            >
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            paddingHorizontal: 35,
                                            paddingVertical: 15,
                                            backgroundColor: "#FFC1D3",
                                            borderRadius: 30,
                                            marginHorizontal: 5,
                                        }}
                                        onPress={() => {
                                            setImageURL();
                                        }}
                                    >
                                        Change
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            paddingHorizontal: 35,
                                            paddingVertical: 15,
                                            backgroundColor: "#FFC1D3",
                                            borderRadius: 30,
                                            marginHorizontal: 5,
                                        }}
                                        onPress={() => {
                                            setModalImage(!modalImage);
                                        }}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </Modal>

                    <Modal
                        backdropStyle={{backgroundColor: "rgba(0, 0, 0, .85)"}}
                        style={{
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        visible={modalName}
                    >
                        <Card style={{width: "90%", maxWidth: "90%", borderRadius: 20}}>
                            <TextInput
                                onChangeText={(x) => {
                                    setNamePicked(x);
                                }}
                                placeholder={"Change Name"}
                                style={{
                                    marginHorizontal: 15,
                                    marginVertical: 10,
                                    minWidth: "90%",
                                    maxWidth: "90%",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                }}
                            ></TextInput>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 40,
                                }}
                            >
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            paddingHorizontal: 35,
                                            paddingVertical: 15,
                                            backgroundColor: "#FFC1D3",
                                            borderRadius: 30,
                                            marginHorizontal: 5,
                                        }}
                                        onPress={() => {
                                            setDisplayName();
                                        }}
                                    >
                                        Change
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            color: "#FFF",
                                            paddingHorizontal: 35,
                                            paddingVertical: 15,
                                            backgroundColor: "#FFC1D3",
                                            borderRadius: 30,
                                            marginHorizontal: 5,
                                        }}
                                        onPress={() => {
                                            setModalName(!modalName);
                                        }}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </Modal>
                </SafeAreaView>

                <View>
                    <View style={{flexDirection: "row", justifyContent: "center"}}>
                        <Card style={{marginHorizontal: 5}}>
                            <Text>Animes Watched</Text>
                            <Text>{watchedAnimes}</Text>
                        </Card>
                        <Card style={{marginHorizontal: 5}}>
                            <Text>Animes in Watchlist</Text>
                            <Text>{watchlistedAnimes}</Text>
                        </Card>
                    </View>

                </View>

                <SafeAreaView
                    style={{justifyContent: "center", alignItems: "center"}}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#EE8AF8",
                            borderRadius: 25,
                            width: "30%",
                            margin: 15,
                        }}
                        onPress={() => {
                            logoutUser();
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                textAlign: "center",
                            }}
                        >
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        );
    } else {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#000",
                    tabBarStyle: {backgroundColor: "#FFC1D3"},
                    tabBarIndicatorStyle: {
                        backgroundColor: "#CCC",
                    },
                }}
            >
                <Tab.Screen
                    SignUpWithEmailAndPassword={SignUpWithEmailAndPassword}
                    name="Sign Up"
                    children={() => (
                        <SignupPage
                            signUpError={signUpError}
                            SignUpWithEmailAndPassword={SignUpWithEmailAndPassword}
                            getUser={props.getUser}
                        />
                    )}
                />
                <Tab.Screen
                    LoginWithEmailandPassword={LoginWithEmailandPassword}
                    name="Sign In"
                    children={() => (
                        <LoginPage
                            getUser={props.getUser}
                            loginError={loginError}
                            LoginWithEmailandPassword={LoginWithEmailandPassword}
                        ></LoginPage>
                    )}
                ></Tab.Screen>
            </Tab.Navigator>
        );
    }
};

const styles = StyleSheet.create({
    cardFriends: {
        marginHorizontal: 20,
        marginTop: 15,
    },
    containerImage: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    containerRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    avatar: {
        marginTop: 10,
        borderRadius: 300,
        borderWidth: 3,
        borderColor: "#FFC1D3",
        width: 300,
        height: 300,
    },
    card: {
        marginHorizontal: 2,
    },
    elevationLow: {},
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
});

export {AccountScreen};
