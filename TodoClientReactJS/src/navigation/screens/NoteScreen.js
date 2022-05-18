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

export default function NoteScreen({navigation}) {
    const [noteAll, setNoteAll] = useState([])
    const [error, setError] = useState({enable: false, text: ''})

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                AsyncStorage.getItem(USER).then(data => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': data
                        }
                    }
                    fetch(note, requestOptions)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("notes: " + JSON.stringify(data))
                            if (!('error' in data)) {
                                setNoteAll(data)
                                AsyncStorage.setItem(NOTE, JSON.stringify(data)).then(r => console.log("Okey, save note"))
                            } else {
                                setError({enable: true, text: data.error})
                            }
                        }).catch(e => {
                            console.log(e)
                            setError({enable: true, text: e.message})
                        })
                })

            })
            return unsubscribe
        }
    )

    return (
        <View style={[{flex: 1}, styles.container]}>
            <ErrorView text={error.text} enable={error.enable}/>
            <CustomButton text="Создать заметку" onPress={() => navigation.navigate(creatorNoteName)}/>
            <ScrollView style={{padding: '5%'}}>
                {noteAll.map(note => <Note note={note} key={note.id} navigation={navigation}/>)}
            </ScrollView>
        </View>
    );
}