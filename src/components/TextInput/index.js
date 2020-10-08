import React from 'react'
import { TextInput} from 'react-native-paper';

const EditText = (props) => {
    return (
        <TextInput
            mode={'outlined'}
            label={props.label}
            theme={{ colors: { background: 'white' } }}
            style={{
                margin:'1%'
            }}
        />
    )
}

export default EditText;