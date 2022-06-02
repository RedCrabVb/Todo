import React, { Dispatch, SetStateAction, useState } from 'react'
import { Text, View, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { saveItem } from "../utils/OperationItem";
import { api } from "../constants/Api";
import Checkbox from 'expo-checkbox';
import { Note } from './class/Note';
import { RootTabScreenProps } from '../types';

interface Props {
    note: Note
    navigation: RootTabScreenProps<'Home'>
    loadNote: (note: Note) => void
    items: Array<Note>
    setItems: Dispatch<SetStateAction<Note[]>>
    disabled: boolean
}

export default function NoteComponent({note, items, setItems, loadNote, disabled = false }: Props) {
    const [select, setSelect] = useState<boolean>(note.pined)

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => loadNote(note)}
            style={disabled ? styles.containerDisabled : styles.container} >
            <Text style={styles.text}>
                {note.head}
            </Text>
            <Text>
                {note.encrypted ? "зашифровано" : ""}
            </Text>
            <Checkbox
                value={select}
                onValueChange={(isChecked) => {
                    note.pined = isChecked
                    let allNoteTmp = items.filter(t => t.id != note.id)
                    allNoteTmp.push(note)
                    setItems(allNoteTmp)

                    saveItem(note, (x) => { }, api.saveNote)
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