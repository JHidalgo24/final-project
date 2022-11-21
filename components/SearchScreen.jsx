import React, {useState} from 'react'

import {Button,ScrollView,  SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, ImageBackground} from "react-native"
import {Input, Text} from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {StatusBar} from "expo-status-bar";
import {AnimeCard} from "./AnimeCard";


let renderIcon = () =>{
    return(
        <MaterialCommunityIcons color='#36446E' name="magnify" size={20}/>
    )
}

let SearchScreen = () => {

    let [search, setSearch] = useState('Your Search Will Appear Here');

    return(
        <ImageBackground style={{flexGrow:1}} source={require('../assets/wallpaper.jpg')}>
            <ScrollView >

                <SafeAreaView style={styles.containerRow}>
                    <Input onChangeText={(x) => {setSearch(x)}}  accessoryRight={renderIcon} style={{marginTop:10, width:'75%', maxWidth:'70%', marginRight:10}} status='primary' placeholder='ex. Naruto, Bleach, One Piece'></Input>
                    <TouchableOpacity style={{maxWidth:'25%',width:'25%', backgroundColor:'#36446E', borderRadius:50, marginTop:10}} ><Text style={{color:'white', padding:10, textAlign:'center'}}>Search</Text></TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Text  style={{padding:12, fontWeight: 'bold'}}>{search}</Text>
                </View>

                <View>
                    <ScrollView>
                        <AnimeCard></AnimeCard>
                        <AnimeCard></AnimeCard>
                        <AnimeCard></AnimeCard>
                        <AnimeCard></AnimeCard>
                        <AnimeCard></AnimeCard>
                        <AnimeCard></AnimeCard>
                    </ScrollView>
                </View>

            </ScrollView>
        </ImageBackground>

    )

}

const styles = StyleSheet.create({

    containerBottom:{
      alignItems: 'center',
      justifyContent: 'center',
      display:'flex',
      flexDirection:'row',
        width:'auto',
        minWidth:50
    },
    containerRow:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    AppBarTitle:{
      color:'#EBEBEB',
      fontWeight:'900',
      fontSize:'25%',
      fontFamily:'American Typewriter',
    
      
    }
  });

export {SearchScreen};