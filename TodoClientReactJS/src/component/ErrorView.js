import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {editNoteName} from "../utils/ScreenNames";

export const ErrorView = ({text, enable = false}) => {

    if (enable) {
        console.log("ErrorView: is " + enable)
        return (
            <View style={styles.container}>
                <Text>Error: {text}</Text>
            </View>
        )
    } else {
        return (<View></View>)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1081d',
        width: '100%',

        padding: 5,
        marginVertical: 5,

        justifyContent: 'flex-start',
        borderRadius: 5,
        flexDirection: 'row'
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
});