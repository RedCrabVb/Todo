import * as React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { api } from '../constants/Api';
import { CustomButton, ErrorView } from "../components/CustomElement";
import { getItem } from "../utils/OperationItem";
import { NOTE } from '../constants/Storage';
import { RootTabScreenProps } from '../types';
import { Note } from '../components/class/Note';
import NoteComponent from '../components/NoteComponent';
import { Text, View } from '../components/Themed';


export default function NoteScreen({ navigation }: RootTabScreenProps<'Note'>) {
    const [noteAll, setNoteAll] = useState<Array<Note>>([])
    const [error, setError] = useState({ enable: false, text: '' })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getItem(setNoteAll, setError, api.note, NOTE)
            console.log(JSON.stringify(noteAll))

        })
        return unsubscribe
    })

    function loadNote(note: Note) {
        console.log("load note: ", {note})
        navigation.navigate('NoteModal', {noteLoad: note})
    }

    return (
        <View>
            <ErrorView text={error.text} enable={error.enable} />
            <CustomButton text="Создать заметку" onPress={() => navigation.navigate('NoteModal', {noteLoad: new Note()})} />
            <ScrollView style={{ padding: '5%' }}>
                
                {
                    noteAll && noteAll.filter(t => t.pined == false).map(note => <NoteComponent note={note} key={note.id} items={noteAll} setItems={setNoteAll} disabled={false} loadNote={loadNote}/>)
                }
                {
                    noteAll && noteAll.filter(t => t.pined == true).length != 0 &&
                    <View>
                        <Text>Закрепленные заметки {noteAll.filter(t => t.pined == true).length}</Text>
                        {noteAll.filter(t => t.pined == true).map(note => <NoteComponent note={note} key={note.id} items={noteAll} setItems={setNoteAll} disabled={false} loadNote={loadNote} />)}
                    </View>
                }
            </ScrollView>
        </View>
    );
}