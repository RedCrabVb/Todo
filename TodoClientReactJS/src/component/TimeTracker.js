import React from 'react'
import {Text, View, StyleSheet, Pressable, TouchableOpacity} from 'react-native'
import {editNoteName, editSmartTaskName, editTimerTrackerName} from "../utils/ScreenNames";

export const TimeTracker = ({timeTracker, navigation}) => {

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(editTimerTrackerName, {time: timeTracker})}
                          style={styles.container} >
            <Text style={styles.textHead}>
                {timeTracker.nameTask}
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