import React from 'react'

import {Button, View, Image, SafeAreaView, StyleSheet, ScrollView} from "react-native"
import {ApplicationProvider, Avatar, Card, Layout,ListItem, List, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


let AccountScreen = ({navigation}) => {
    const data = ['Bleach', 'Naruto', 'Naruto:Shippuden'];
    const friends = new Array(10).fill({
        title:'Friend'
    })


    const renderItem = ({ item }) => (
        <ListItem>
            <Text style={{fontWeight:'bold'}}>{item}</Text>
        </ListItem>
    );
    const renderFriends = ({ item, index }) => (
        <ListItem>
            <Text  style={{fontWeight:'bold'}}>{item.title} {index + 1}</Text>
        </ListItem>
    );


    return(

        <ApplicationProvider {...eva} theme={eva.light}>
        <ScrollView nestedScrollEnabled = {true}>

                <View style={styles.containerImage}>
                    <Image  style={styles.avatar} source={require('../assets/avatar.jpg')} ></Image>
                    <Text style={{marginTop:20,marginBottom:5}} category='h4'>User Name</Text>
                    <Text style={{marginBottom:20}} category='h6'>email@email.com</Text>
                </View>

                    <Card  style={styles.cardFriends}>
                        <Text>Anime in Watchlist</Text>
                        <List
                            style={styles.container}
                            data={data}
                            renderItem={renderItem}
                        />
                    </Card>
                    <Card style={styles.cardFriends}>
                        <Text>Animes Watched</Text>
                        <List
                            style={styles.container}
                            data={data}
                            renderItem={renderItem}
                        />
                    </Card>


                    <Card style={styles.cardFriends}>
                        <Text category='h5'>Your Friends</Text>
                        <List
                            style={styles.container}
                            data={friends}
                            renderItem={renderFriends}
                        />

                    </Card>
        </ScrollView>
        </ApplicationProvider>
    )

}

const styles = StyleSheet.create({
    cardFriends:{
        marginHorizontal:20,
        marginTop:15
    },
    containerImage: {
        justifyContent:'flex-start',
        alignItems:'center',

    },
    containerRow:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start'
    },
    avatar:{
        marginTop:10,
        borderRadius:150,
        borderWidth:3,
        borderColor:'#586FB3',

    },
    card:{
        marginHorizontal:2
    },
    elevationLow:{

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
    
      
    }
  });

export {AccountScreen};