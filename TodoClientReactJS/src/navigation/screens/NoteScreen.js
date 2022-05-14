import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {useEffect, useState} from "react"
import {allNote, server} from '../../utils/Api'
import {Note} from '../../component/Note'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../utils/Storage";
import {creatorNoteName} from "../../utils/ScreenNames";
import {CustomButton} from "../../component/CutomButton";

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
                        }
                    }
                    fetch(allNote, requestOptions)
                        .then((response) => {console.log(response.body); if (response.body != null) { return response.json() } else {return JSON.parse("[]")}})
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
        <View style={{flex: 1}}>
            <CustomButton text="Создать заметку" onPress={() => navigation.navigate(creatorNoteName)}/>
            <Text>Заметки</Text>
            <ScrollView style={{padding: '5%'}}>
                {noteAll.map(note => <Note note={note} key={note.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}