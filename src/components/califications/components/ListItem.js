import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const ListItem = ({whenPress, children}) => {
    return(
        <TouchableOpacity onPress={whenPress} style={styles.container}>
            {children}
        </TouchableOpacity>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        padding: 5,
        height: 60,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
}

export default ListItem;
