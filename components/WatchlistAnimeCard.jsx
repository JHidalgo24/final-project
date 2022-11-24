import React, {useState} from 'react'

import {
    Button,
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
    Linking,
    ActivityIndicator, TouchableOpacity
} from "react-native"
import {ApplicationProvider, Card, Divider, Layout, Modal, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Link} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const WatchlistAnimeCard = (props) => {

    let [isVisible, setIsVisible] = useState(false);


    return (


        <Card style={{margin: 10, width: '95%', borderRadius: 25, borderWidth: 2}}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.containCenter}>
                    <Image resizeMethod={'scale'}
                           style={styles.postImageAvatar}
                           source={{
                               uri: `${props.item.images.jpg.large_image_url}`
                           }}
                    />


                </View>
                <View style={{width: '75%'}}>
                    <Text category={'h6'}>{props.item.title}</Text>




                </View>
            </View>
        </Card>

    )
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
    }, postImageAvatar: {
        height: 80, width: 80, borderRadius: 50, borderWidth: 2,
    }, containCenter: {
        justifyContent: 'center', alignItems: 'center', marginRight: 20
    }
});

export {WatchlistAnimeCard}