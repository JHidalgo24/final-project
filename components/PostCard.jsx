import React, {useState} from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
    SafeAreaView, View, StyleSheet, ScrollView, TextInput, Image, ImageBackground, Linking, TouchableOpacity, Switch
} from "react-native"
import {ApplicationProvider, Card, Input, Layout, Text, Button, Toggle} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Link} from "@react-navigation/native";


const PostCard = ({navigation}) => {

    let [hidePassword, setHidePassword] = useState(true);


    return (<ImageBackground style={styles.imageBackground} source={require('../assets/wallpaper.jpg')}>
        <Card style={{marginHorizontal: 10}}>
            <Text category={'h5'}>Post Title</Text>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi architecto at cum cumque
                doloremque doloribus ducimus facere in ipsam libero magnam modi officia perspiciatis possimus quam
                similique tenetur, unde, voluptate!</Text>

            <View style={styles.buttonsLike}>
                <TouchableOpacity style={styles.buttonsLike}><Text><MaterialCommunityIcons size={30}
                                                                                           name={'thumb-up'}></MaterialCommunityIcons></Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonsLike}><Text><MaterialCommunityIcons size={30}
                                                                                           name={'thumb-down'}></MaterialCommunityIcons></Text></TouchableOpacity>
            </View>
        </Card>
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
    }, buttonsLike: {
        marginLeft: 15, marginTop: 20, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row'
    }

});

export {PostCard}