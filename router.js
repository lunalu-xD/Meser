import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './src/screens/HomeScreen'
// import LoginScreen from './src/screens/LoginScreen'
// import ChatRoomScreen from './src/screens/ChatRoomScreen'
// import OTPScreen from './src/screens/OTPScreen'
// import RegisterScreen from './src/screens/RegisterScreen'
import {
    LoginScreen,
    RegisterScreen,
    ChatRoomScreen,
    HomeScreen,
    OTPScreen
} from './src/screens';

import AsyncStorage from '@react-native-community/async-storage';
import { restoreUser } from './src/redux/actions/user';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
    )
}

//Router dùng để điều hướng
//Khi chưa đăng nhập thì sẽ ở stack login ...
const Router = () => {

    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();
    const [isLoging, setIsLoging] = React.useState(true)

    React.useEffect(() => {
        console.log('UseEffect trong route');
        AsyncStorage.getItem('user').then((user) => {
            if (user) { 
                setIsLoging(true)
                const action = restoreUser(user);
                dispatch(action);
                setIsLoging(false)
            }else{
                setIsLoging(false)
            }

        }).catch((error) => console.log(error));

    },[])
    if(isLoging) return <ActivityIndicator size="large" color="#0000ff" style={{justifyContent: "center", alignSelf:'center'}}/>;
    //Kiểm tra user, nêu có thì đi vào màn hình home
    return (
        <NavigationContainer>
            {user ? (
                <HomeStack />
            ) : (
                    <LoginStack />
                )}
        </NavigationContainer>
    )
}

export default Router;