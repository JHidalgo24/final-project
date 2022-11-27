import { StatusBar } from 'expo-status-bar';
import {StyleSheet, SafeAreaView, View, Button, ImageBackground, ActivityIndicator} from 'react-native';
import {HomeScreen} from './components/Screen/HomeScreen'
import { SearchScreen } from './components/Screen/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountScreen } from './components/Screen/AccountScreen';
import { WatchlistScreen } from './components/Screen/WatchlistScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import {MyTabs} from "./components/Fragments/MyTabs";
import {useFonts} from "expo-font";
import {firebase} from "./configs/firebaseConfig";
import User from "./Models/User";
import {useEffect, useState} from "react";
import { LogBox } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
"AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'"]);//Ignore all log notifications
export default function App() {



let [isVisible, setIsVisible] = useState(false)

  let getUser = async () => {
    setIsVisible(true)
    await firebase.auth().onAuthStateChanged(x => {
      if (x) {
        setUser(new User(x))
      } else {
        setUser(null)
      }
    })
    setIsVisible(false)
  }


  useEffect(()=>{
    
    getUser()
    
  },[])


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
