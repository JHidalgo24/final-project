import React, {useEffect, useState} from 'react'

import {Button, SafeAreaView, Image, StyleSheet, TouchableOpacity, View, ImageBackground, FlatList} from "react-native"
import {Input, Text} from "@ui-kitten/components";
import {AnimeCard} from "./AnimeCard";
import {db} from "../firebaseConfig";
import {WatchlistAnimeCard} from "./WatchlistAnimeCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


let renderThingy = ({item}) => {
    return (
        <View><WatchlistAnimeCard  item={item}></WatchlistAnimeCard></View>
    )
}

let WatchlistScreen = (props) => {

    let [watchlistItems, setWatchlistItems] = useState([])



    let getWatchlist = async () => {

        let tempArray = []


        let watchlistStuff = await db.collection('Users').doc(props.user.uid).collection('watchlist').get().then(yo => {
            return yo.docs;
        })


        watchlistStuff.forEach(doc => {
            tempArray.push(doc.data())
        })

        setWatchlistItems(tempArray)
    }
    useEffect(()=>{

        if (props.user !== null){
            getWatchlist()
        }
    })


    if (props.user !== null){
        return (
            <ImageBackground style={{flexGrow: 1}} source={require('../assets/watchlist_background.png')}>
                <TouchableOpacity ><Text  style={{textAlign:'center', color:'#CCC', margin:15}} category={'h4'}>Refresh <MaterialCommunityIcons size={25} name={'refresh'}></MaterialCommunityIcons>
                </Text></TouchableOpacity>

                <FlatList windowSize={10} removeClippedSubviews={true} updateCellsBatchingPeriod={10} initialNumToRender={5} maxToRenderPerBatch={5} data={watchlistItems} renderItem={renderThingy}></FlatList>



            </ImageBackground>

        )
    }
    else {
        return (
            <ImageBackground style={{flexGrow: 1}} source={require('../assets/watchlist_background.png')}>
                <View style={styles.container}>
                    <Text category='h6' style={styles.bigText}>You aren't signed in yet </Text>
                    <Image source={require('../assets/ChiSilly.png')} resizeMode={'contain'} resizeMethod={'scale'} style={{width:50}}></Image>

                </View>
            </ImageBackground>

        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
    }, containerBottom: {
        alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',
    }, bigText: {
        color: '#000', marginTop: 30, fontFamily: ''
    }
});

export {WatchlistScreen};