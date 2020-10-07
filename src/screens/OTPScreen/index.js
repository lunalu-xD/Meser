import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CodeInput from 'react-native-confirmation-code-input';

export default function index() {
    return (
        <View>
             <CodeInput
                secureTextEntry
                compareWithCode='AsDW2'
                activeColor='rgba(49, 180, 4, 1)'
                inactiveColor='rgba(49, 180, 4, 1.3)'
                autoFocus={false}
                ignoreCase={true}
                inputPosition='center'
                size={50}
                className={'border-circle'}
                onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
                containerStyle={{ marginTop: 30 }}
                codeInputStyle={{ borderWidth: 1.5 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
