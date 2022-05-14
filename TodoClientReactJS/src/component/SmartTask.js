import React from 'react'
import {Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import {editNoteName, editSmartTaskName} from "../utils/ScreenNames";

export const SmartTask = ({smartTask, navigation, disabled = false}) => {

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => navigation.navigate(editSmartTaskName, {task: smartTask})}
                          style={disabled ? styles.containerDisabled : styles.container} >
            <Text style={styles.text}>
                {smartTask.specific}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#3949ab',
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
        color: 'white'
    }
});