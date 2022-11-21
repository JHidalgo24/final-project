import React, {useState} from 'react'

import {SafeAreaView, StyleSheet, TouchableOpacity, View, ImageBackground, Image, ScrollView} from "react-native"
import {
    Card, Layout, ButtonGroup, Input, Modal, Text, Button, Drawer, DrawerItem, ModalPanel, Divider
} from "@ui-kitten/components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


let AnimeCard = (props) => {

    let [visible, setVisible] = useState(false);

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

                <View style={styles.buttonGroupThing} level='1'>


                    <TouchableOpacity onPress={() => setVisible(true)} appearance='ghost'><Text
                        style={styles.buttonText}>More Info <MaterialCommunityIcons
                        name='book'/></Text></TouchableOpacity>
                    <TouchableOpacity color='#EE8AF8' appearance='ghost'><Text
                        style={styles.buttonText}>Watched <MaterialCommunityIcons
                        name='eye-check'></MaterialCommunityIcons></Text></TouchableOpacity>
                    <TouchableOpacity color='#EE8AF8' appearance='ghost'><Text
                        style={styles.buttonText}>Watchlist <MaterialCommunityIcons
                        name='book-plus'></MaterialCommunityIcons></Text></TouchableOpacity>


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

                            <Button onPress={() => {
                                setVisible(false)
                            }}>Close</Button>
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
        width: "90%", height: 500, alignSelf: 'center', borderRadius: 25

    },
});

export {AnimeCard};