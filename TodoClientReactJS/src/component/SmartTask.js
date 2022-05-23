import React, {useState} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {editNoteName, editSmartTaskName} from "../utils/ScreenNames";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {saveItem} from "../utils/SaveItem";
import {saveSmartTask} from "../utils/Api";

export const SmartTask = ({smartTask, navigation, taskAll, setAllTask}) => {
    const [select, setSelect] = useState(smartTask.completed)
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(editSmartTaskName, {task: smartTask})}
                          style={styles.container} >
            <Text style={styles.textHead}>
                {smartTask.specific}
            </Text>
            <Text style={styles.text}>
                {smartTask.timeBound}
            </Text>
            <BouncyCheckbox
                fillColor='#5e72d9'
                isChecked={select}
                onPress={(isChecked) => {
                    smartTask.completed = isChecked
                    let allTaskTmp = taskAll.filter(t => t.id != smartTask.id)
                    allTaskTmp.push(smartTask)
                    setAllTask(allTaskTmp)

                    saveItem(smartTask, (x) => {}, saveSmartTask)
                    setSelect(isChecked)
                }
                } />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container : {
        borderWidth: 2,
        borderColor: '#5e72d9',
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