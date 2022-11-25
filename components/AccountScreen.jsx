import React, {useEffect, useState} from 'react'

import {
    Button,
    View,
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ImageBackground,
    FlatList,
    Switch,
    TouchableOpacity,
    TextInput
} from "react-native"
import {ApplicationProvider, Avatar, Card, Layout, ListItem, List, Text, Modal} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {LoginPage} from "./LoginPage";
import {auth, firebase} from "../firebaseConfig";
import User from "../Models/User";
import {SignupPage} from "./SignupPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";


const Tab = createMaterialTopTabNavigator();


let AccountScreen = (props) => {
    const data = ['Bleach', 'Naruto', 'Naruto:Shippuden'];
    const friends = new Array(10).fill({
        title: 'Friend'
    })


    const renderItem = ({item}) => (<ListItem>
        <Text style={{fontWeight: 'bold'}}>{item}</Text>
    </ListItem>);
    const renderFriends = ({item, index}) => (<ListItem>
        <Text style={{fontWeight: 'bold'}}>{item.title} {index + 1}</Text>
    </ListItem>);
    let [userSignedIn, setUserSignedIn] = useState(false)
    let [signUp, setSignUp] = useState(true);
    let [modalName, setModalName] = useState(false);
    let [modalImage, setModalImage] = useState(false);
    let [user, setUser] = useState();
    let [namePicked, setNamePicked] = useState();
    let [imagePicked, setImagePicked] = useState();
    let [signUpError, setSignUpError] = useState();
    let [loginError, setLoginError] = useState();

    let setUserThingy = () => {
        if (props.user !== null){
            setUser(props.user)
            setUserSignedIn(true)
        }
    }
    
    useEffect(() => {
  
        setUserThingy()
    },[])

    let LoginWithEmailandPassword = async (email, password) => {
        let provider = await firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            var user = userCredential.user;
            setUser(new User(user));
            setUserSignedIn(true)
            props.getUser();
            setLoginError(' ')

        }).catch((err) => {
            setLoginError(err.message)
        })
    }

    let SignUpWithEmailAndPassword = async (email, password) => {

        let provider = await firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            var user = userCredential.user;
            setUser(new User(user))
            setUserSignedIn(true);
            props.getUser();
            setSignUpError(' ')

        }).catch((err) => {
            setSignUpError(err.message)
        })
    }

    let setDisplayName = async () => {


        const userUpdate = firebase.auth().currentUser;

        await userUpdate.updateProfile({
            displayName: namePicked,
        })



        props.getUser()

        setUser(props.user)


        setModalName(!modalName)
    }
    let setImageURL = async () => {


        const userUpdate = firebase.auth().currentUser;

        await userUpdate.updateProfile({
            photoURL: imagePicked,
        })

        props.getUser()
        setUser(props.user)

        setModalImage(!modalImage)
    }

    let logoutUser = async () => {
        await firebase.auth().signOut()
        setUserSignedIn(false)
        await props.getUser();
    }

    if (userSignedIn) {
        return (<ImageBackground style={{flexGrow:1}} source={require('../assets/watchlist_background.png')}>
            <SafeAreaView>

                <SafeAreaView style={styles.containerImage}>
                    <TouchableOpacity onPress={() => {
                        setModalName(!modalName)
                    }}><Text style={{marginTop: 20}}
                             category={'h3'}>{user.displayName === '' ? "Set Name " : user.displayName}<MaterialCommunityIcons
                        size={20} name='pencil'/> </Text></TouchableOpacity>
                    <Text style={{marginTop: 20, marginBottom: 5, color: '#000'}} category='h6'>{user.email}</Text>
                    <Image
                        resizeMethod={'resize'}
                        style={styles.avatar}
                        source={{
                            uri: `${user.photoURL === '' || user.photoURL === null ? 'https://1fid.com/wp-content/uploads/2022/07/boy-anime-wallpaper-image-for-profile-pic-81.jpg' : user.photoURL}`
                        }}
                    />
                    <TouchableOpacity onPress={() => {
                        setModalImage(!modalImage)
                    }} style={{
                        color: '#FFF',  borderRadius: 15, width: 200, marginVertical:10, textAlign: 'center'
                    }}><Text style={{textAlign: 'center', padding: 12, fontWeight: 'bold',}}>Change
                        Image <MaterialCommunityIcons size={20} name='pencil'/></Text></TouchableOpacity>

                    <Modal backdropStyle={{backgroundColor: 'rgba(0, 0, 0, .85)'}}
                           style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}
                           visible={modalImage}>
                        <Card style={{width: '90%', maxWidth: '90%', borderRadius: 20}}>
                            <TextInput onChangeText={(x) => {
                                setImagePicked(x)
                            }} placeholder={'Change Image URL'} style={{
                                marginHorizontal: 15,
                                marginVertical: 10,
                                minWidth: '90%',
                                maxWidth: '90%',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 5
                            }}></TextInput>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40
                            }}>
                                <TouchableOpacity><Text style={{
                                    color: '#FFF',
                                    paddingHorizontal: 35,
                                    paddingVertical: 15,
                                    backgroundColor: '#FFC1D3',
                                    borderRadius: 30,
                                    marginHorizontal: 5

                                }} onPress={() => {
                                    setImageURL()
                                }}>Change</Text></TouchableOpacity>
                                <TouchableOpacity><Text style={{
                                    color: '#FFF',
                                    paddingHorizontal: 35,
                                    paddingVertical: 15,
                                    backgroundColor: '#FFC1D3',
                                    borderRadius: 30,
                                    marginHorizontal: 5

                                }} onPress={() => {
                                    setModalImage(!modalImage)
                                }}>Cancel</Text></TouchableOpacity>
                            </View>
                        </Card>
                    </Modal>


                    <Modal backdropStyle={{backgroundColor: 'rgba(0, 0, 0, .85)'}}
                           style={{width: "100%", justifyContent: 'center', alignItems: 'center'}}
                           visible={modalName}>
                        <Card style={{width: '90%', maxWidth: '90%', borderRadius: 20}}>
                            <TextInput onChangeText={(x) => {
                                setNamePicked(x)
                            }} placeholder={'Change Name'} style={{
                                marginHorizontal: 15,
                                marginVertical: 10,
                                minWidth: '90%',
                                maxWidth: '90%',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                paddingVertical: 5
                            }}></TextInput>
                            <View style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 40
                            }}>
                                <TouchableOpacity><Text style={{
                                    color: '#FFF',
                                    paddingHorizontal: 35,
                                    paddingVertical: 15,
                                    backgroundColor: '#FFC1D3',
                                    borderRadius: 30,
                                    marginHorizontal: 5

                                }} onPress={() => {
                                    setDisplayName()
                                }}>Change</Text></TouchableOpacity>
                                <TouchableOpacity><Text style={{
                                    color: '#FFF',
                                    paddingHorizontal: 35,
                                    paddingVertical: 15,
                                    backgroundColor: '#FFC1D3',
                                    borderRadius: 30,
                                    marginHorizontal: 5

                                }} onPress={() => {
                                    setModalName(!modalName)
                                }}>Cancel</Text></TouchableOpacity>
                            </View>
                        </Card>
                    </Modal>


                </SafeAreaView>



                <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{backgroundColor: '#EE8AF8', borderRadius: 25, width: '30%', margin: 15}}
                        onPress={() => {
                            logoutUser()
                        }}><Text
                        style={{color: '#FFF', paddingHorizontal: 10, paddingVertical: 10, textAlign: 'center'}}>Log
                        Out</Text></TouchableOpacity>

                </SafeAreaView>
            </SafeAreaView>
        </ImageBackground>)
    } else {
        return (<Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#000', tabBarStyle: {backgroundColor: '#FFC1D3'}, tabBarIndicatorStyle: {
                backgroundColor: '#CCC'
            }
        }}>
            <Tab.Screen SignUpWithEmailAndPassword={SignUpWithEmailAndPassword} name="Sign Up"
                        children={() => <SignupPage signUpError={signUpError} SignUpWithEmailAndPassword={SignUpWithEmailAndPassword}/>}/>
            <Tab.Screen LoginWithEmailandPassword={LoginWithEmailandPassword} name="Sign In"
                        children={() => <LoginPage loginError={loginError}
                            LoginWithEmailandPassword={LoginWithEmailandPassword}></LoginPage>}></Tab.Screen>
        </Tab.Navigator>)
    }

}

const styles = StyleSheet.create({
    cardFriends: {
        marginHorizontal: 20, marginTop: 15
    }, containerImage: {
        justifyContent: 'flex-start', alignItems: 'center',

    }, containerRow: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'
    }, avatar: {
        marginTop: 10, borderRadius: 300, borderWidth: 3, borderColor: '#586FB3', width: 300, height: 300,

    }, card: {
        marginHorizontal: 2
    }, elevationLow: {}, containerBottom: {
        alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',


    }
});

export {AccountScreen};