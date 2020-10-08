import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import {user} from '../LoginScreen'

import ChatRoomScreen from '../ChatRoomScreen'

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
    const dispatch = useDispatch();
    const [user, setUser] = React.useState('')

    const logOut = async () => {
        try {
            await AsyncStorage.removeItem('user')
            .then(() => {
                let action = signOut();
                dispatch(action);
            })
          } catch(e) {
            // remove error
          }
        
          console.log('Done.')

    }

    const test = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log(keys)
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home! {user.id}</Text>
            <Button title={"Đăng xuất"} onPress={() => logOut()}></Button>
            <Button title={"Go to chat room"} onPress={() => navigation.navigate('ChatRoom')}></Button>
        </View>
    );
}

function SettingsScreen({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}




const index = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'person' : 'person-outline';
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>
            <Tab.Screen name="Home" component={ChatRoomScreen} />
            <Tab.Screen name="Settings" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default index;

const styles = StyleSheet.create({})
