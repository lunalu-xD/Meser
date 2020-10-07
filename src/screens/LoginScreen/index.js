import React from 'react'
import { StyleSheet, Text, View, ToastAndroid, FlatList } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';


export default function index({ navigation }) {


    const [username, setUsername] = React.useState('luan');
    const [password, setPassword] = React.useState('123');
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();


    const login = async () => {

        const user = {
            id: username,
            name: password,
        }
        AsyncStorage.setItem('user', JSON.stringify(user))
            .then(() =>
                {
                    let action = signIn(user)
                    dispatch(action)
                    console.log(user)
                }
               )

    }
    return (
        <View style={styles.body}>
            <TextInput
                label="Số điện thoại"
                onChangeText={text => setUsername(text)}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="Mật khẩuu"
                onChangeText={text => setPassword(text)}
                theme={{ colors: { background: 'white' } }}
            />
            <Button mode="contained" onPress={() => login()}>Đăng nhập</Button>
            <Text style={{ alignSelf: 'center', marginTop: 30, color: 'blue' }} onPress={() => login()}>Đăng kí</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: '2%',
        alignContent: 'center'
    }
})
