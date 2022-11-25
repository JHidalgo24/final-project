import React, {useEffect, useState} from 'react'

import {
    Button,
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Image,
    ImageBackground,
    Linking,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native"
import {ApplicationProvider, Card, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {Link, useIsFocused} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {PostCard} from "./PostCard";
import {auth, db, firebase} from "../firebaseConfig";

import User from "../Models/User";


const CommunityChat = (props) => {

    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let [posts, setPosts] = useState([]);
    let [isVisible, setIsVisible] = useState(false)
    let [displayNameMissing, setDisplayNameMissing] = useState(false);
    let [photoURLMissing, setPhotoURLMissing] = useState(false);
    let isFocused = useIsFocused();

    let renderPosts = ({item}) => {
        return (<View style={{width: '100%'}}>
            <PostCard item={item}>

            </PostCard>
        </View>)
    }

    let addPost = async () => {
        setIsVisible(true)
        if (props.user !== null) {
            let userThingy = firebase.auth().currentUser;
            await db.collection('CommunityPosts').add({
                PostTitle: title, PostContent: content, uid: userThingy.uid, displayName:userThingy.displayName,userImage:userThingy.photoURL,email:userThingy.email
            }).then(() => {
                setContent('');
                setTitle('')
            })
        } else {

            if (props.user.displayName === null || props.user.displayName === "") {
                setDisplayNameMissing(true)
            }
            else {
                setDisplayNameMissing(false)
            }
            if (props.user.photoURL === null || props.user.photoURL === "") {
                setPhotoURLMissing(true)

            }
            else {
                setPhotoURLMissing(false)
            }

        }
        await getPost();
        setIsVisible(false)
    }

    let getPost = async () => {
        let emptyArray = [];
        setIsVisible(true);
        await db.collection("CommunityPosts").get().then((querySnap) => {
            querySnap.forEach((doc) => emptyArray.push(doc.data()))
        })

        setPosts(emptyArray)

        setIsVisible(false);
    }

    useEffect(() => {

        if (props.user !== null){
            getPost = async () => {


                setDisplayNameMissing(false)
                setPhotoURLMissing(false);

                setIsVisible(true);
                let stuff = await db.collection("CommunityPosts").get().then(yo => {
                    return yo.docs;
                })

                let tempArray = stuff.map(doc => doc.data())

                setPosts(tempArray)
                setIsVisible(false);
                await props.getUser();


            }

            getPost()
        }


    }, [isFocused])




if(isFocused === false){
    return (<View></View>)
}

    if(isVisible ){
return(
    <ImageBackground style={{ flexGrow: 1, alignContent:'center', justifyContent:'center' }} source={require('../assets/watchlist_background.png')} >
    <ActivityIndicator  size={100} color={'#FFC1D3'}></ActivityIndicator>
</ImageBackground>
)
    }else{
        return (
            
            <ImageBackground  style={{flexGrow: 1}} source={require('../assets/watchlist_background.png')}>
            { isFocused ? 
                    <ScrollView>
                        <SafeAreaView style={{
                            backgroundColor: '#FFF',
                            borderRadius: 25,
                            justifyContent: 'flex-end',
                            marginVertical: 20,
                            marginHorizontal: 10,
                            borderColor: '#FFC1D3',
                            borderWidth: 2
                        }}>

                            <Text category={'h4'} style={{textAlign: 'center', paddingTop: 20}}>Make a post</Text>
                            <TextInput value={title} onChangeText={(x) => {
                                setTitle(x)
                            }} style={styles.inputItem} placeholder='Post Title'></TextInput>
                            <TextInput value={content} onChangeText={(x) => {
                                setContent(x)
                            }} multiline={true} style={styles.postContent} placeholder='Content'></TextInput>
                            {displayNameMissing ?
                                <Text style={styles.missingInfo}>You don't have a name for your account. Set one in the Account Page</Text> : null}
                            {photoURLMissing ? <Text style={styles.missingInfo}>You are Missing an image please add one to your account</Text> : null}
                            <TouchableOpacity><Text style={{
                                color: '#FFF',
                                paddingHorizontal: 35,
                                paddingVertical: 15,
                                backgroundColor: '#FFC1D3',
                                margin: 30,
                                borderRadius: 30,

                            }} onPress={() => {
                                addPost()
                            }}>Post</Text></TouchableOpacity>
                        </SafeAreaView>
                        <ScrollView>
                            <Text style={{textAlign: 'center', marginTop: 15, marginBottom: 0}} category={'h2'}>Recent
                                Posts <TouchableOpacity onPress={() => {
                                    getPost()
                                }}><MaterialCommunityIcons size={20}
                                                           name={'refresh'}></MaterialCommunityIcons></TouchableOpacity></Text>



                            <FlatList data={posts} renderItem={renderPosts}></FlatList>

                        </ScrollView>

                    </ScrollView>: null}
                </ImageBackground>
        )
    }



}

const styles = StyleSheet.create({

    homeHeader: {
        fontSize: 20, textAlign: 'center', fontFamily: 'American Typewriter'
    }, cardTitle: {
        marginBottom: 20
    }, containerBottom: {
        alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row'
    }, AppBarTitle: {
        color: '#EBEBEB', fontWeight: '900', fontSize: '25%', fontFamily: 'American Typewriter',
    }, logo: {
        width: '100%', height: '100%',
    }, card: {
        flex: 1, marginVertical: 20, marginHorizontal: 5, borderRadius: 25
    }, rowContainer: {
        flexDirection: 'row'
    }, inputItem: {
        margin: 25, borderWidth: 1, borderColor: '#000', borderRadius: 25, paddingLeft: 20, height: 50
    }, postContent: {
        margin: 25, borderWidth: 1, borderColor: '#000', borderRadius: 25, paddingHorizontal: 20, height: 150
    }, image: {
        flex: 1, justifyContent: 'center', height: '100%',
    },
    missingInfo:{
        textAlign:'center',
        color:'red',
        fontWeight:'bold',
        marginVertical:2
    }
});

export {CommunityChat}
