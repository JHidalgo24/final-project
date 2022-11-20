import React from 'react'

import {Button, Text, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity} from "react-native"
import {Input} from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {StatusBar} from "expo-status-bar";


let renderIcon = () =>{
    return(
        <MaterialCommunityIcons color='#36446E' name="magnify" size={20}/>
    )
}

let SearchScreen = ({navigation}) => {

    return(
        <SafeAreaView >
            <SafeAreaView style={styles.containerRow}>
                <Input  accessoryRight={renderIcon} style={{marginTop:10, width:'75%', maxWidth:'70%', marginRight:10}} status='primary' placeholder='ex. Naruto, Bleach, One Piece'></Input>
                <TouchableOpacity style={{maxWidth:'25%',width:'25%', backgroundColor:'#36446E', borderRadius:50, marginTop:10}} ><Text style={{color:'white', padding:10, textAlign:'center'}}>Search</Text></TouchableOpacity>
            </SafeAreaView>

            <View>

            </View>
        </SafeAreaView>

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
        width:'100%',
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