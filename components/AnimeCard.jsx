import React, {useState} from 'react'

import {SafeAreaView, StyleSheet, TouchableOpacity, View, ImageBackground, Image, ScrollView} from "react-native"
import {Card, Input, Modal, Text, Button} from "@ui-kitten/components";


let AnimeCard = (props) => {

    let [visible,setVisible] = useState(false);

    return(
        <Card style={{marginVertical:5}}>
            <Text category='h5'>
                Anime Name
            </Text>
            <View>
                <Image style={styles.imageContain} source={require('../assets/example-cover-art.png')}>
                </Image>
            </View>
            <View>
                <Button appearance='ghost' onPress={() => {setVisible(true)}} >Show Info</Button>
            </View>



                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}>

                    <Card style={{width: '100%',justifyContent:'center',alignItems:'center'}} disabled={true}>
                        <Image style={styles.imageContain} source={require('../assets/example-cover-art.png')}>
                        </Image>
                        <View>
                            <Text style={{textAlign:'center'}} category='h5'>Bleach</Text>
                            <Text>Description:</Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus adipisci aliquid assumenda autem consequatur cum eligendi est fugiat fugit hic iste iure libero maiores mollitia nisi repellendus, sequi.
                            </Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus adipisci aliquid assumenda autem consequatur cum eligendi est fugiat fugit hic iste iure libero maiores mollitia nisi repellendus, sequi.
                            </Text>


                        </View>
                        <Button onPress={() => setVisible(false)}>
                            DISMISS
                        </Button>
                    </Card>

                </Modal>


        </Card>

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
    },
    imageContain:{
        alignSelf:'center'

    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export {AnimeCard};