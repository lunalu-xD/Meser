import React from 'react'
import { Paragraph, Dialog, Portal } from 'react-native-paper';

const AlertDialog = (props) => {
    return (
        <Portal>
            <Dialog visible={props.visible}>
                <Dialog.Content>
                    <Paragraph>This is simple dialog</Paragraph>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default AlertDialog;