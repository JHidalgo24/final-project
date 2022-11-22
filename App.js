import { StatusBar } from 'expo-status-bar';
import {StyleSheet, SafeAreaView, View, Button, ImageBackground} from 'react-native';
import {HomeScreen} from './components/HomeScreen'
import { SearchScreen } from './components/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountScreen } from './components/AccountScreen';
import { WatchlistScreen } from './components/WatchlistScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {MyTabs} from "./components/MyTabs";
import {useFonts} from "expo-font";
import {firebase} from "./firebaseConfig";
import User from "./Models/User";
import {useEffect, useState} from "react";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();








export default function App() {



  let getUser = async () => {
    await firebase.auth().onAuthStateChanged(x => {
      if (x) {
        setUser(new User(x))
      } else {
        setUser(null)
      }
    })
  }


  let [user, setUser] = useState(null);

  return (


    <NavigationContainer onStateChange={() => getUser()}>
      <ApplicationProvider {...eva} theme={eva.light}>
          <MyTabs getUser={getUser} user={user} ></MyTabs>
      </ApplicationProvider>
    </NavigationContainer>

  );
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
  },
    navigator:{
      backgroundColor:'black',
        color:'rgb(0,0,0)'
    }
});
