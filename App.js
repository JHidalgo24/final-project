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



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



let  MyTabs = () => {
    return (
        <Tab.Navigator style={styles.navigator} screenOptions={{
            tabBarActiveTintColor: '#68CACA',
        }}>
            <Tab.Screen options={{
                tabBarLabel: 'Home',
                headerStyle:{
                    backgroundColor:'#36446E'
                },
                headerTintColor:'#FFF'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{
                tabBarLabel: 'Search',headerStyle:{
                    backgroundColor:'#36446E'
                },
                headerTintColor:'#FFF'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={size} />
                ),
            }} name="Search" component={SearchScreen} />
            <Tab.Screen options={{
                tabBarLabel: 'My Watchlist',headerStyle:{
                    backgroundColor:'#36446E'
                },
                headerTintColor:'#FFF'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="filmstrip-box-multiple" color={color} size={size} />
                ),
            }} name="Watchlist" component={WatchlistScreen} />
            <Tab.Screen options={{
                tabBarLabel: 'Account',headerStyle:{
                    backgroundColor:'#36446E'
                },
                headerTintColor:'#FFF'
                ,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
            }} name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
  return (


    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
          <MyTabs></MyTabs>
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
    fontFamily:'American Typewriter',
  },
    navigator:{
      backgroundColor:'black',
        color:'rgb(0,0,0)'
    }
});
