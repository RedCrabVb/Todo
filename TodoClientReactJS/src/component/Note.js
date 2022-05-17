import React from 'react'
import {Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import {editNoteName} from "../utils/ScreenNames";

export const Note = ({note, navigation, disabled = false}) => {

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => navigation.navigate(editNoteName, {note: note})}
                          style={disabled ? styles.containerDisabled : styles.container} >
            <Text style={styles.text}>
                {note.head}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container : {
        borderWidth: 2,
        borderColor: '#3949ab',

        width: '100%',

        padding: 15,
        marginVertical: 5,

        justifyContent: 'flex-start',
        borderRadius: 5,
        flexDirection: 'row'
    },
    containerDisabled : {
        backgroundColor: '#b3bdfc',
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        color: 'black'
    }
});