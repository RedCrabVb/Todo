import React from 'react'
import {Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import {editNoteName, editSmartTaskName} from "../utils/ScreenNames";

export const SmartTask = ({smartTask, navigation}) => {

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(editSmartTaskName, {task: smartTask})}
                          style={styles.container} >
            <Text style={styles.textHead}>
                {smartTask.specific}
            </Text>
            <Text style={styles.text}>
                {smartTask.timeBound}
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
        borderRadius: 5
    },
    textHead: {
        fontWeight: 'bold',
        color: 'black'
    },
    text: {
        color: 'black',
        textAlign: 'right'
    }
});