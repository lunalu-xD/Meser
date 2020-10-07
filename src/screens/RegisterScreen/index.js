import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';


export default function index({ navigation }) {

    const register = async () => {
        const phoneNumber = '+84 96 664 49 39'
        await auth().signInWithPhoneNumber(phoneNumber, true)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).

                confirmationResult.confirm()
                    .then((result) => {
                        ToastAndroid.show(JSON.stringify(result), ToastAndroid.SHORT);
                        auth().onAuthStateChanged((result) => {
                            console.log(result);
                        })
                    })
                    .catch(() => {

                    });

            }).catch(function (error) {
                ToastAndroid.show("SMS Error: " + error, ToastAndroid.SHORT);
                console.log(error)
            });
    }

    return (
        <View>
            <TextInput
                label="Số điện thoại"
                onChangeText={text => setPassword(text)}
                theme={{ colors: { background: 'white' } }}
            />
            <Button mode="contained" onPress={() => register()}>Đăng kí</Button>
        </View>
    )
}

const styles = StyleSheet.create({})
