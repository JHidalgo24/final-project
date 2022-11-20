import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import {HomeScreen} from './components/HomeScreen'
import { SearchScreen } from './components/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccountScreen } from './components/AccountScreen';
import { WatchlistScreen } from './components/WatchlistScreen';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#68CACA',
      }}>
          <Tab.Screen options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} name="Home" component={HomeScreen} />
          <Tab.Screen options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }} name="Search" component={SearchScreen} />
        <Tab.Screen options={{
          tabBarLabel: 'My Watchlist',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="filmstrip-box-multiple" color={color} size={size} />
          ),
        }} name="Watchlist" component={WatchlistScreen} />
         <Tab.Screen options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} name="Account" component={AccountScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59C3C3',
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
  
    
  }
});
