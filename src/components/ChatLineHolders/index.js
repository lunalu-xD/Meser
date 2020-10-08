import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';



const ChatLine = (props) => {
    return (
        <View style={{
            flexDirection: 'column', alignItems: 'flex-start', width: '50%',
            padding: 10, backgroundColor: '#FFF', borderRadius: 8, marginBottom: 10, marginTop: 10, marginLeft: 5, marginRight: 5, elevation: 5
        }} >
            <Text>{props.chatContent}</Text>
        </View>
    );
}

const ChatLineHolder = (props) => {
    if (props.item.userName === props.currentUser) {
        return (
            <View style={{ alignItems: 'flex-end' }} >
                <ChatLine sender="YOU" chatContent={props.item.chatContent} />
            </View>
        );
    }
    return (
        <View style={{ alignItems: 'flex-start', flexDirection:'row' }} >
            <Avatar.Icon size={30} icon="folder" style={{ marginTop: 10}}/>
            <ChatLine sender={props.username} chatContent={props.item.chatContent} />
        </View>

    );
};

export default ChatLineHolder;