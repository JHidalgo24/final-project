import React, {useEffect, useState} from 'react'

import {Button, SafeAreaView, Image, StyleSheet, TouchableOpacity, View, ImageBackground, FlatList} from "react-native"
import {Input, Text} from "@ui-kitten/components";
import {AnimeCard} from "./AnimeCard";
import {db} from "../firebaseConfig";
import {WatchlistAnimeCard} from "./WatchlistAnimeCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {useIsFocused} from "@react-navigation/native";


let renderThingy = ({item}) => {
    return (
        <View><WatchlistAnimeCard item={item}></WatchlistAnimeCard></View>
    )
}

let WatchlistScreen = (props) => {

    const isFocused = useIsFocused();

    let [watchlistItems, setWatchlistItems] = useState([])


    let getWatchlist = async () => {


        let watchlistStuff = await db.collection('Users').doc(props.user.uid).collection('watchlist').get().then(yo => {
            return yo.docs;
        })

        let tempArray = watchlistStuff.map(doc => doc.data())

        setWatchlistItems(tempArray)
    }
    useEffect(() => {

        getWatchlist()

    })



        return (
            <ImageBackground style={{flexGrow: 1}} source={require('../assets/watchlist_background.png')}>

                <SafeAreaView>



                    {isFocused ? <FlatList windowSize={10} removeClippedSubviews={true} updateCellsBatchingPeriod={10}
                                           initialNumToRender={5} maxToRenderPerBatch={5} data={watchlistItems}
                                           renderItem={renderThingy}></FlatList> : null}


                </SafeAreaView>
            </ImageBackground>

        )

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
