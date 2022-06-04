import React, { Dispatch, SetStateAction, useState } from 'react'
import { StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { saveItem } from "../utils/OperationItem";
import { api } from "../constants/Api";
import Checkbox from 'expo-checkbox';
import { Note } from './class/Note';
import { RootTabScreenProps } from '../types';
import { Text, View } from './Themed';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { SmartTask } from './class/SmartTask';

interface Props {
    task: SmartTask
    loadNote: (task: SmartTask) => void
    items: Array<SmartTask>
    setItems: Dispatch<SetStateAction<SmartTask[]>>
    disabled: boolean
}

export default function TskComponent({ task, items, setItems, loadNote, disabled = false }: Props): JSX.Element {
    const [select, setSelect] = useState<boolean>(task.completed)

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => loadNote(task)}
            style={disabled ? styles.containerDisabled : styles.container} >
            <View style={{flexDirection: 'row'}}>
                <Text
                    lightColor={Colors.white}
                    darkColor={Colors.black}
                    style={styles.text}>
                    {task.specific}
                </Text>
            </View>

            <Checkbox
                value={select}
                onValueChange={(isChecked) => {
                    task.completed = isChecked
                    let allTaskTmp = items.filter(t => t.id != task.id)
                    allTaskTmp.push(task)
                    setItems(allTaskTmp)

                    saveItem(task, (x) => { }, api.saveNote)
                    setSelect(isChecked)
                }} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#5e72d9',
        width: '100%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5
    },
    containerDisabled: {
        backgroundColor: '#b3bdfc',
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
    }
});