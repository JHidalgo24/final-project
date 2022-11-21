import React, {useState} from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
    SafeAreaView, View, StyleSheet, ScrollView, TextInput, Image, ImageBackground, Linking, TouchableOpacity, Switch
} from "react-native"
import {ApplicationProvider, Card, Input, Layout, Text, Button, Toggle} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Link} from "@react-navigation/native";


const LoginPage = (props) => {

    let [hidePassword, setHidePassword] = useState(false);
    let [password, setPassword] = useState();
    let [email, setEmail] = useState();
    let loginWithPassword = () => {

        props.LoginWithEmailandPassword(email, password)

    }


    return (<ImageBackground style={styles.imageBackground} source={require('../assets/wallpaper.jpg')}>
        <View style={styles.container}>
            <Text style={{marginVertical: 15}} category={'h4'}>Sign In</Text>
            <TextInput onChangeText={(z) => {
                setEmail(z)
            }} style={{
                marginHorizontal: 15,
                marginVertical: 15,
                minWidth: '90%',
                maxWidth: '90%',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5
            }}
                       placeholder='Email' keyboardType='email-address'></TextInput>

            <TextInput onPress={() => {
                setHidePassword(!hidePassword)
            }} secureTextEntry={!hidePassword} placeholder='Password' onChangeText={(x) => {
                setPassword(x)
            }} style={{
                marginHorizontal: 15,
                marginVertical: 10,
                minWidth: '90%',
                maxWidth: '90%',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5
            }}></TextInput>
            <Text style={{fontWeight: 'bold'}}>{hidePassword ? <MaterialCommunityIcons name={'eye'}/> :
                <MaterialCommunityIcons name={'eye-off'}/>}</Text>
            <Switch trackColor={{false: "#767577", true: "#EE8AF8"}}
                    thumbColor='#FFC1D3' value={hidePassword}
                    onValueChange={() => setHidePassword(!hidePassword)}></Switch>

            <Text style={{color:'red', fontWeight:'bold'}} >{props.loginError}</Text>
            <TouchableOpacity><Text style={{
                color: '#FFF',
                paddingHorizontal: 35,
                paddingVertical: 15,
                backgroundColor: '#FFC1D3',
                margin: 30,
                borderRadius: 30,

            }} onPress={() => {
                loginWithPassword()
            }}>Sign-in</Text></TouchableOpacity>
        </View>
    </ImageBackground>)
}

const styles = StyleSheet.create({
    imageBackground: {
        flexGrow: 2, justifyContent: 'center', alignItems: 'center'
    }, container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        marginHorizontal: 20,
        borderColor: '#CCC',
        borderWidth: 1
    }, inputContainer: {
        backgroundColor: 'white', borderRadius: 8, flexDirection: 'row', alignItems: 'center'
    },

});

export {LoginPage}