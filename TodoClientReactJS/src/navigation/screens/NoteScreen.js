import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {useEffect, useState} from "react"
import {note, server} from '../../utils/Api'
import {Note} from '../../component/Note'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {USER, SMART_TASK, NOTE} from "../../utils/Storage"
import {creatorNoteName} from "../../utils/ScreenNames"
import {CustomButton} from "../../component/CutomButton"
import {styles} from "../../css/css"
import {ErrorView} from "../../component/ErrorView";
import {getItem} from "../../utils/GetItem";

export default function NoteScreen({navigation}) {
    const [noteAll, setNoteAll] = useState([])
    const [error, setError] = useState({enable: false, text: ''})

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                getItem(setNoteAll, setError, note)
                console.log(JSON.stringify(noteAll))

            })
            return unsubscribe
        }
    )

    return (
        <View style={[{flex: 1}, styles.container]}>
            <ErrorView text={error.text} enable={error.enable}/>
            <CustomButton text="Создать заметку" onPress={() => navigation.navigate(creatorNoteName)}/>
            <ScrollView style={{padding: '5%'}}>
                {
                    noteAll.map(note => <Note note={note} key={note.id} navigation={navigation}/>)
                }
            </ScrollView>
        </View>
    );
}