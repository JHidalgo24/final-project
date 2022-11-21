import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {HomeScreen} from "./HomeScreen";
import {SearchScreen} from "./SearchScreen";
import {WatchlistScreen} from "./WatchlistScreen";
import {AccountScreen} from "./AccountScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native";


const Tab = createBottomTabNavigator();

let  MyTabs = () => {
    return (
        <Tab.Navigator style={styles.navigator} screenOptions={{
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
            }} name="Search" component={SearchScreen} />
            <Tab.Screen options={{
                tabBarLabel: 'My Watchlist',headerStyle:{
                    backgroundColor:'#FFC1D3'
                },
                headerTintColor:'#000'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="filmstrip-box-multiple" color={color} size={size} />
                ),
            }} name="Watchlist" component={WatchlistScreen} />
            <Tab.Screen options={{
                tabBarLabel: 'Account',headerStyle:{
                    backgroundColor:'#FFC1D3'
                },
                headerTintColor:'#000'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }} name="Account" component={AccountScreen} />
        </Tab.Navigator>
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
        fontFamily:'American Typewriter',
    },
    navigator:{
        backgroundColor:'black',
        color:'rgb(0,0,0)'
    }
});

export {MyTabs}