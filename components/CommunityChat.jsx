import React from 'react'

import {
    Button, SafeAreaView, View, StyleSheet, ScrollView, Image, ImageBackground, Linking, TouchableOpacity, TextInput
} from "react-native"
import {ApplicationProvider, Card, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Link} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {PostCard} from "./PostCard";


const CommunityChat = () => {


    return (<ImageBackground style={{flexGrow: 1}} source={require('../assets/watchlist_background.png')}>
        <ScrollView>
            <SafeAreaView style={{
                backgroundColor: '#FFF',
                borderRadius: 25,
                justifyContent: 'flex-end',
                marginVertical: 20,
                marginHorizontal: 10
            }}>
                <Text category={'h4'} style={{textAlign: 'center', paddingTop: 20}}>Make a post</Text>
                <TextInput style={styles.inputItem} placeholder='Post Title'></TextInput>
                <TextInput multiline={true} style={styles.postContent} placeholder='Content'></TextInput>

            </SafeAreaView>
            <ScrollView>
                <Text style={{textAlign: 'center'}} category={'h2'}>Recent Posts</Text>
                <PostCard></PostCard>

            </ScrollView>

        </ScrollView>
    </ImageBackground>)
}

const styles = StyleSheet.create({

    homeHeader: {
        fontSize: 20, textAlign: 'center', fontFamily: 'American Typewriter'
    }, cardTitle: {
        marginBottom: 20
    }, containerBottom: {
        alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',
    }, logo: {
        width: '100%', height: '100%',
    }, card: {
        flex: 1, marginVertical: 20, marginHorizontal: 5, borderRadius: 25
    }, rowContainer: {
        flexDirection: 'row'
    }, inputItem: {
        margin: 25, borderWidth: 1, borderColor: '#000', borderRadius: 25, paddingLeft: 20, height: 50
    }, postContent: {
        margin: 25, borderWidth: 1, borderColor: '#000', borderRadius: 25, paddingHorizontal: 20, height: 150
    }, image: {
        flex: 1, justifyContent: 'center', height: '100%',
    }, buttonsLike: {
        marginLeft: 15, marginTop: 20, alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row'
    }
});

export {CommunityChat}