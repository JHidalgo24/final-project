import React, {useEffect, useState} from 'react'

import {
    SafeAreaView, StyleSheet, TouchableOpacity, View, Button, ImageBackground, Image, ScrollView, ActivityIndicator
} from "react-native"
import {
    Card, Layout, ButtonGroup, Input, Modal, Text, Drawer, DrawerItem, ModalPanel, Divider
} from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {db} from "../firebaseConfig";


let AnimeCard = (props) => {

    let [visible, setVisible] = useState(false);
    let [inWatched, setInWatched] = useState(false);
    let [inWatchlist, setInWatchlist] = useState(false);
    let [isVisible, setIsVisible] = useState(false);

    let checkIfInDatabaseWatchlist = async () => {

        let idWatchlist = null;

        if (props.user !== null){
            let watchlistStuff = await db.collection('Users').doc(props.user.uid).collection('watchlist').get().then(yo => {
                return yo.docs;
            })

            watchlistStuff.forEach(doc => {
                if (doc.data().mal_id === props.item.mal_id) {
                    idWatchlist = doc.id
                }
            })

            if (idWatchlist !== null) {
                setInWatchlist(true)
            }
        }

    }

    let checkIfInDatabaseWatched = async () => {

        let idWatched = null;

        if (props.user !== null){
            let watchedList = await db.collection('Users').doc(props.user.uid).collection('watched').get().then(yo => {
                return yo.docs;
            })

            watchedList.forEach(doc => {
                if (doc.data().mal_id === props.item.mal_id) {
                    idWatched = doc.id
                }
            })

            if (idWatched !== null) {
                setInWatched(true)
            }

        }
    }

    let addToWatchList = async () => {
        if (!inWatchlist) {
            setIsVisible(true)
            setInWatchlist(true)
            await db.collection('Users').doc(props.user.uid).collection('watchlist').add(props.item).catch((error) => {
                setInWatchlist(false)
            }).finally(() => {
                setIsVisible(false)
            })
            await checkIfInDatabaseWatchlist()
        }
    }

    let addToWatched = async () => {
        if (!inWatched) {
            setIsVisible(true)
            setInWatched(true)
            await db.collection('Users').doc(props.user.uid).collection('watched').add(props.item).catch((error) => {
                setInWatched(false)
            }).finally(() => {
                setIsVisible(false)
            })
            await checkIfInDatabaseWatched()
        }
    }

    useEffect(() => {
        checkIfInDatabaseWatchlist()
        checkIfInDatabaseWatched()
    })

    return (

        <View style={{marginVertical: 5}}>
            <Text style={{textAlign: 'center', paddingBottom: 20}} category='h5'>
                {props.item.title}
            </Text>

            <View>
                <Image resizeMethod={'scale'}
                       style={styles.tinyLogo}
                       source={{
                           uri: `${props.item.images.jpg.large_image_url}`
                       }}
                />

                <View style={{flexDirection: 'column'}}>
                    {isVisible ? <ActivityIndicator animating={isVisible} style={{margin: 10}} size={40}
                                                    color={'#EE8AF8'}></ActivityIndicator> : null}
                    <View style={styles.buttonGroupThing} level='1'>

                        <TouchableOpacity color='#EE8AF8' onPress={() => {
                            setVisible(true)
                        }}><Text style={styles.buttonText}>More Info <MaterialCommunityIcons
                            name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity>

                        {inWatched || props.user === null  ? <TouchableOpacity color='#EE8AF8' onPress={() => {
                                addToWatched()
                            }} disabled={props.user === null || inWatched}><Text
                                style={styles.buttonTextDisabled}>Watched <MaterialCommunityIcons
                                name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity> :
                            <TouchableOpacity color='#EE8AF8' onPress={() => {
                                addToWatched()
                            }} disabled={props.user === null || inWatched}><Text
                                style={styles.buttonText}>Watched <MaterialCommunityIcons
                                name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity>}
                        {inWatchlist || props.user === null   ? <TouchableOpacity color='#EE8AF8' onPress={() => {
                                addToWatchList()
                            }} disabled={props.user === null || inWatchlist}><Text
                                style={styles.buttonTextDisabled}>WatchList <MaterialCommunityIcons
                                name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity> :
                            <TouchableOpacity color='#EE8AF8' onPress={() => {
                                addToWatchList()
                            }} disabled={props.user === null || inWatchlist}><Text
                                style={styles.buttonText}>WatchList <MaterialCommunityIcons
                                name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity>}


                    </View>
                </View>
            </View>
            <ScrollView>
                <Modal backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}} visible={visible}>

                    <Card style={{borderRadius: 20}}>
                        <ScrollView>
                            <Text style={{textAlign: 'center'}} category={'h5'}>Description</Text>
                            <Divider></Divider>
                            <Text style={styles.description}
                                  category={'h6'}>{props.item.synopsis === null ? "There was no synopsis provided for this title." : props.item.synopsis}</Text>

                            <Button color='#EE8AF8' title='Close' style={styles.buttons} onPress={() => {
                                setVisible(false)
                            }}></Button>
                        </ScrollView>
                    </Card>

                </Modal>
            </ScrollView>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-start',
    }, buttonGroupThing: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 25,
        marginHorizontal: 15,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#EE8AF8'
    }, description: {
        padding: 10
    }, containerBottom: {
        alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',
    }, bigText: {
        color: '#000', marginTop: 30, fontFamily: ''
    }, imageContain: {
        alignSelf: 'center'

    }, buttonText: {
        color: '#EE8AF8', margin: 15, fontWeight: 'bold'
    }, backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, tinyLogo: {
        width: "90%", height: 500, alignSelf: 'center', borderRadius: 25, borderWidth: 2, borderColor: '#EE8AF8'
    }, buttonTextDisabled: {
        color: '#CCC', margin: 15, fontWeight: 'bold'
    }
});

export {AnimeCard};