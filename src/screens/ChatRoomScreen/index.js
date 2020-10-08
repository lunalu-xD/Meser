import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import database from '@react-native-firebase/database'
import { useSelector } from 'react-redux';
import ChatLineHolder from '../../components/ChatLineHolders'



export default function index() {
    const user = useSelector(state => state.user.currentUser);
    console.log(user);
    const [list, setList] = React.useState([]);
    const userRef = database().ref('chatRoom');

    const listRef = React.createRef();

    const refreshChatBox = async () => {
        userRef.on('value', (snap) => {
            var items = [];
            snap.forEach((item) => {
                let child = {
                    id: item.key,
                    chatContent: item.val().chatContent,
                }
                items.push(child)
            })
            setList(items);
            console.log(items);
        });

    }


    //Refresh when data changes
    React.useEffect(() => {
        refreshChatBox();
    }, [])


    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={ ({item}) => <ChatLineHolder item={item} currentUser={user.username}/>}
                ref={listRef}
                onContentSizeChange={() => listRef.current.scrollToEnd(true)}
            ></FlatList>
            <InputContent currentUser={user}/>
        </View>

    )
}



const InputContent = (props) => {
    const inputContent = React.createRef();

    const currentUser = JSON.parse(props.currentUser);

    const [content, setContent] = React.useState('');

    //push message to database 

    const _sendMessage = () => {
        database().ref('/chatRoom').child(currentUser.id+ Date.now()).set({
            userName: currentUser.name,
            chatContent: content,

        });
        inputContent.current.clear();
        setContent('')

    }
    return (
        <View style={styles.inputContent}>
            <TextInput 
            placeholder={'input your test'} 
            style={styles.inputText} 
            onChangeText={(text) => setContent(text)} 
            ref={inputContent}
            multiline={true}></TextInput>
            <TouchableOpacity  disabled={content.length<1} style={styles.btnSend} onPress={() => _sendMessage(content)}>
                <Text style={{fontWeight:'bold', color:'blue', fontSize:16}}>Gửi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: "1%",
    },
    inputContent: {
        height:'10%',
        flexDirection: 'row',
    },
    inputText: {
        borderRadius:20,

        flex: 5,
        width: "100%",
        height: '100%',
        elevation:1
    }, btnSend: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})
