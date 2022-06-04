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

interface Props {
    note: Note
    loadNote: (note: Note) => void
    items: Array<Note>
    setItems: Dispatch<SetStateAction<Note[]>>
    disabled: boolean
}

export default function NoteComponent({ note, items, setItems, loadNote, disabled = false }: Props): JSX.Element {
    const [select, setSelect] = useState<boolean>(note.pined)

    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={() => loadNote(note)}
            style={disabled ? styles.containerDisabled : styles.container} >
            <View style={{flexDirection: 'row'}}>
                {note.encrypted && <AntDesign name={'lock'} size={24} color="black" />}
                <Text
                    lightColor={Colors.white}
                    darkColor={Colors.black}
                    style={styles.text}>
                    {note.head}
                </Text>
            </View>

            <Checkbox
                value={select}
                onValueChange={(isChecked) => {
                    note.pined = isChecked
                    let allNoteTmp = items.filter(t => t.id != note.id)
                    allNoteTmp.push(note)
                    setItems(allNoteTmp)

                    saveItem(note, (x) => { }, api.saveNote)
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