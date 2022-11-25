import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeScreen} from "./HomeScreen";
import {SearchScreen} from "./SearchScreen";
import {WatchlistScreen} from "./WatchlistScreen";
import {AccountScreen} from "./AccountScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native";
import {LoginPage} from "./LoginPage";
import {CommunityChat} from "./CommunityChat";
import { WatchedScreen } from "./WatchedScreen";
import {useEffect} from "react";


const Tab = createBottomTabNavigator();

let  MyTabs = (props) => {



    if (props.user !== null){
        return (
            <Tab.Navigator detachInactiveScreens={true} style={styles.navigator}  screenOptions={{
                tabBarActiveTintColor: '#EE8AF8',
            }}>
                <Tab.Screen options={{
                    tabBarLabel: 'Home',
                    headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} name="Home" component={HomeScreen} />
                <Tab.Screen options={{
                    tabBarLabel: 'Search',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={size} />
                    ),
                }} name="Search" children={() => <SearchScreen getUser={props.getUser} user={props.user}></SearchScreen>} />

<Tab.Screen options={{
                    tabBarLabel: 'Watched',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="check-bold" color={color} size={size} />
                    ),
                }} name="Watched" children={() => <WatchedScreen getUser={props.getUser} user={props.user}></WatchedScreen>} />
                <Tab.Screen options={{
                    tabBarLabel: 'Watchlist',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="filmstrip-box-multiple" color={color} size={size} />
                    ),
                }} name="Watchlist" children={() => <WatchlistScreen user={props.user} getUser={props.getUser}></WatchlistScreen>} />
                
                <Tab.Screen options={{
                    tabBarLabel: 'Community',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="message" color={color} size={size} />
                    ),
                }} name="Community Chat"  children={() => <CommunityChat getUser={props.getUser} user={props.user} ></CommunityChat>} />
                <Tab.Screen options={{
                    tabBarLabel: 'Account',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }} name="Account" children={() => <AccountScreen user={props.user} getUser={props.getUser}></AccountScreen>} />
            </Tab.Navigator>
        );
    }
    else{
        return(
            <Tab.Navigator style={styles.navigator} screenOptions={{
                tabBarActiveTintColor: '#EE8AF8',
            }}>
                <Tab.Screen  options={{
                    tabBarLabel: 'Home',
                    headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} name="Home" component={HomeScreen} />
                <Tab.Screen options={{
                    tabBarLabel: 'Account',headerStyle:{
                        backgroundColor:'#FFC1D3'
                    },
                    headerTintColor:'#000'
                    ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }} name="Account" children={() => <AccountScreen user={props.user} getUser={props.getUser}></AccountScreen>} />
            </Tab.Navigator>
        )
    }
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
    navigator:{
        backgroundColor:'black',
        color:'rgb(0,0,0)'
    }
});

export {MyTabs}
