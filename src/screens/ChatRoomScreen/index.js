import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import database from '@react-native-firebase/database'

export default function index() {

    const [list, setList] = React.useState([]);
    const userRef = database().ref('users');
    const listRef = React.createRef();

    const dataRealtimeChange = async () => {
        userRef.on('value', (snap) => {
            var items = [];
            snap.forEach((item) => {
                let child = {
                    id: item.key,
                    name: item.val().test,
                    title: item.val().age,
                }
                items.push(child)
            })
            setList(items);
        });

    }

    //Refresh when data changes
    React.useEffect(() => {
        dataRealtimeChange();
    }, [])

    const item = ({item}) => {

    }

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={item}
                ref={listRef}
                onContentSizeChange={()=> listRef.current.scrollToEnd(true)}
                            ></FlatList>
            <InputContent />
        </View>

    )
}



const InputContent = () => {
    const [data, setData] = React.useState('');
    //push message to database 
    async function sendMessage(data) {
        try {
            await database()
                .ref('users/')
                .push({

                   

                })
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <View style={styles.inputContent}>
            <TextInput placeholder={'input your test'} style={styles.inputText} onChangeText={(text) => setData(text)}></TextInput>
            <TouchableOpacity style={styles.btnSend} onPress={() => sendMessage(data)}>
                <Text>TExt</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: "1%",
    },
    inputContent: {
        backgroundColor: 'red',
        height: 50,
        flexDirection: 'row',

    },
    inputText: {
        backgroundColor: 'yellow',
        flex: 5,
        width: "100%",
        height: '100%'
    }, btnSend: {
        backgroundColor: 'silver',
        flex: 1,
    }
})
