import React from 'react'
import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function index({ navigation }) {
    const [confirm, setConfirm] = React.useState(null)
    const [code, setCode] = React.useState('')

    const register = async () => {
        const phoneNumber = '+84 96 664 49 39'
        await auth().signInWithPhoneNumber(phoneNumber, true)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                setConfirm(confirmationResult);
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // confirmationResult.confirm()
                //     .then((result) => {
                //         ToastAndroid.show(JSON.stringify(result), ToastAndroid.SHORT);
                //         auth().onAuthStateChanged((result) => {
                //             console.log(result);
                //         })
                //     })
                //     .catch(() => {

                //     });

            }).catch(function (error) {
                ToastAndroid.show("SMS Error: " + error, ToastAndroid.SHORT);
                console.log(error)
            });
    }

    async function confirmCode() {
        try {
            console.log(code);
            await confirm.confirm(code);
            console.log('Ok');
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    return (
        <View>
            <TextInput
                label="Code"
                onChangeText={text => setCode(text)}
                theme={{ colors: { background: 'white' } }}
            />
            <Button mode="contained" onPress={() => confirmCode()}>Xác nhận</Button>
            <Button mode="contained" onPress={() => register()}>Đăng kí</Button>
        </View>
    )
}

const styles = StyleSheet.create({})
