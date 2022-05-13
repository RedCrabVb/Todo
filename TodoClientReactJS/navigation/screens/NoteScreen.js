import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {useEffect, useState} from "react"
import {allNote} from '../../src/utils/Api'
import {Note} from '../../src/component/Note'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../src/utils/Storage";
import {creatorTestName} from "../../src/utils/ScreenNames";
import {CustomButton} from "../../src/component/CutomButton";

export default function NoteScreen({navigation}) {
    const [noteAll, setNoteAll] = useState([])

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                AsyncStorage.getItem(USER).then(data => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': data
                        },
                    }
                    fetch(allNote, requestOptions)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("notes: " + JSON.stringify(data))
                            if (!('error' in data)) {
                                setNoteAll(data)
                            }
                        })
                })

            })
            return unsubscribe
        }
    )

    return (
        <View>
            <CustomButton text="Создать заметку" onPress={() => navigation.navigate(creatorTestName)}/>
            <Text>Заметки</Text>
            <ScrollView style={{padding: '0%'}}>
                {noteAll.map(note => <Note note={note} key={note.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}