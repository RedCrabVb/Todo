import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { editNoteName } from "../utils/ScreenNames";
import { saveItem } from "../utils/SaveItem";
import { saveNote } from "../utils/Api";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const Note = ({ note, navigation, noteAll, setAllNote, disabled = false }) => {
    const [select, setSelect] = useState(note.pind)

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => navigation.navigate(editNoteName, { note: note })}
            style={disabled ? styles.containerDisabled : styles.container} >
            <Text style={styles.text}>
                {note.head}
            </Text>
            <BouncyCheckbox
                fillColor='#5e72d9'
                isChecked={select}
                onPress={(isChecked) => {
                    note.pined = isChecked
                    let allNoteTmp = noteAll.filter(t => t.id != note.id)
                    allNoteTmp.push(note)
                    setAllNote(allNoteTmp)

                    saveItem(note, (x) => { }, saveNote)
                    setSelect(isChecked)
                }
                } />
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
        color: 'black'
    }
});