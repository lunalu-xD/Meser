import React from 'react'
import { StyleSheet, Text, View, ToastAndroid, FlatList, TouchableOpacity, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';
import AlertDialog from '../../components/Dialog'

export default function index({ navigation }) {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoging, setIsLoging] = React.useState(false);



    const login = async (username, password) => {
        setIsLoging(true);
        if (username == 'admin' && password == 'admin') {
            const user = {
                id: '0966644939',
                name: username,
            }
            try {
                await AsyncStorage.setItem('user', JSON.stringify(user))
                    .then(() => {
                        let action = signIn(user)
                        dispatch(action)
                        setIsLoging(false)
                    }).catch((error) => console.log(error))
            } catch (error) {
                console.log(error)
            }
        } else {
            ToastAndroid.show('Tài khoản ko đúng', ToastAndroid.SHORT);
        }




    }

    // const getAllKeys = async () => {
    //     let keys = []
    //     try {
    //         keys = await AsyncStorage.getAllKeys()
    //     } catch (e) {
    //         // read key error
    //     }

    //     console.log(keys)
    //     // example console.log result:
    //     // ['@MyApp_user', '@MyApp_key']
    // }

    if(isLoging) return <AlertDialog visible={isLoging}/>

    return (
        <View style={styles.body}>
            <View style={styles.body}>
                <Image
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    source={require('../../assets/images/login_image.png')}
                />
            </View>
            <View style={styles.bottom}>
                <TextInput
                    mode={'outlined'}
                    label={'Số điện thoại'}
                    theme={{ colors: { background: 'white' } }}
                    style={{
                        margin: '1%'
                    }}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    mode={'outlined'}
                    label={'Mật khẩu'}
                    theme={{ colors: { background: 'white' } }}
                    style={{
                        margin: '1%'
                    }}
                    onChangeText={text => setPassword(text)}
                />
                <Button style={{ marginTop: 20, padding: 8 }} mode="contained" onPress={() => login(username, password)}>Đăng nhập</Button>
                <Button style={{ marginTop: 5, padding: 8 }} mode="outlined" onPress={() => navigation.navigate('Register')}>Đăng kí</Button>
                <TouchableOpacity onPress={() => ToastAndroid.show('Updating', ToastAndroid.SHORT)}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 16, marginTop: 20, color: '#0067FF' }}>Quên mật khẩu</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: '2%',
        alignContent: 'center'
    },
    top: {
        flex: 1,

    },
    bottom: {
        flex: 1,
    }
})
