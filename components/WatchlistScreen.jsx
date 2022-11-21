import React from 'react'

import {Button, SafeAreaView, StyleSheet, TouchableOpacity, View, ImageBackground} from "react-native"
import {Input,Text} from "@ui-kitten/components";


let WatchlistScreen = ({navigation}) => {


    return(
        <ImageBackground style={{flexGrow:1}} source={require('../assets/watchlist_background.png')}>
            <View style={styles.container}>
                <Text category='h6' style={styles.bigText}>You have nothing in here :(</Text>
            </View>
        </ImageBackground>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    containerBottom:{
      alignItems: 'center',
      justifyContent: 'center',
      display:'flex',
      flexDirection:'row'
    },
    AppBarTitle:{
      color:'#EBEBEB',
      fontWeight:'900',
      fontSize:'25%',
      fontFamily:'American Typewriter',
    },
    bigText:{
        color:'#000',
        marginTop:30,
        fontFamily:''
    }
  });

export {WatchlistScreen};