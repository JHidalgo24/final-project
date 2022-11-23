import React, {useEffect, useState} from 'react'

import {
    Button,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator,
    FlatList,
    Image,
    Switch
} from "react-native"
import {Card, Divider, Input, ListItem, Spinner, Text, Toggle} from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {StatusBar} from "expo-status-bar";
import {AnimeCard} from "./AnimeCard";
import axios from "axios";


let renderIcon = () => {
    return (<MaterialCommunityIcons color='#36446E' name="magnify" size={20}/>)
}





let SearchScreen = (props) => {
    const renderItem = ({item}) => (<View style={{flexDirection: 'column', width: "100%", marginBottom: 10}}>
        <AnimeCard user={props.user} item={item}></AnimeCard>
    </View>);

    let [search, setSearch] = useState('Your Search Will Appear Here');
    let [stuff, setStuff] = useState([]);
    let [isVisible, setIsVisible] = useState(false)
    const url = 'https://api.jikan.moe/v4/anime/'
    let [startingImage, setStartingImage] = useState(require("../assets/wallpaper.jpg"))
    let [nothingFound, setNothingFound] = useState(false);
    let [lewdStuff, setLewdStuff] = useState(false);


    useEffect(() => {

    })


    const SearchAnime = async () => {
        let statusCode = 0;
        let paramsStuff = {}
        try {
            setStuff([])
            setIsVisible(true);
            if (lewdStuff) {
                paramsStuff = {
                    q: search,
                }
            } else {
                paramsStuff = {
                    q: search, sfw: true,
                }
            }
            let response = await axios.get(url, {
                params: paramsStuff
            }).then((res) => {
                setStuff(res.data.data);
                return res;
            });


            if (response.data.data.length === 0) {
                setStartingImage(require('../assets/nothing-found.png'))
                setNothingFound(true);
            } else {
                setStartingImage(require('../assets/wallpaper.jpg'))
                setNothingFound(false);
            }
        } catch (ex) {
            console.log(ex.message)
        } finally {
            setIsVisible(false);
        }
    }



    return (

        <ImageBackground style={{flexGrow: 1}} source={startingImage}>
            <ScrollView>

                <SafeAreaView style={styles.containerRow}>
                    <Input onChangeText={(x) => {
                        setSearch(x)
                    }} accessoryRight={renderIcon}
                           style={{
                               marginTop: 10,
                               width: '75%',
                               maxWidth: '70%',
                               marginRight: 10,
                               fontStyle: 'italic',
                               borderRadius: 8,
                               borderWidth: 1,
                               borderColor: '#000'
                           }}
                           placeholder='ex. Naruto, Bleach, One Piece'></Input>
                    <TouchableOpacity onPress={() => {
                        SearchAnime()
                    }} style={{
                        maxWidth: '25%', width: '25%', backgroundColor: '#FFC1D3', borderRadius: 50, marginTop: 10
                    }}><Text style={{color: 'white', padding: 10, textAlign: 'center'}}>Search</Text></TouchableOpacity>

                </SafeAreaView>


                <View>
                    <SafeAreaView>
                        <SafeAreaView style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            flexDirection: 'row',
                            marginVertical: 0,
                            paddingVertical: 0
                        }}>
                            <Text style={{fontWeight: 'bold', color: 'red', fontStyle: 'italic'}}>NSFW</Text>
                            <Switch trackColor={{false: "#767577", true: "#EE8AF8"}}
                                    thumbColor='#FFC1D3' value={lewdStuff}
                                    onValueChange={() => setLewdStuff(!lewdStuff)}></Switch>

                        </SafeAreaView>

                        <View style={styles.container}>
                            {isVisible ? <ActivityIndicator color='#EE8AF8' size={'large'} hidesWhenStopped={true}
                                                            animating={isVisible}></ActivityIndicator> : null}
                            {nothingFound ? <View style={{flexDirection: 'row'}}><Text category={'h3'}>Nothing was
                                Found </Text><Image
                                style={{width: 40, height: 40}}
                                source={require('../assets/panic.gif')}></Image></View> : <Text></Text>}
                        </View>

                        <FlatList
                            maxToRenderPerBatch={5}
                            data={stuff}
                            renderItem={renderItem}
                        />

                    </SafeAreaView>
                </View>
            </ScrollView>

        </ImageBackground>


    )

}

const styles = StyleSheet.create({

    containerBottom: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        minWidth: 50
    }, containerRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',
    }, container: {
        justifyContent: 'center', alignItems: 'center',
    }
});

export {SearchScreen};