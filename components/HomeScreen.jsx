import React from "react"

import { SafeAreaView,ScrollView,Text,Button,View, StyleSheet, Image} from "react-native"

const HomeScreen = ({navigation}) =>{



    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
            <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
            </SafeAreaView>
            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D2EFEF'
    },
    homeHeader:{
        fontSize:20,
        textAlign:'center',
        fontFamily:'American Typewriter'
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
    logo: {
        width: '100%',
        height: '100%',
      },
  });

export {HomeScreen}