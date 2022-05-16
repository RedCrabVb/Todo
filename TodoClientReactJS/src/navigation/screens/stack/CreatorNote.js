import * as React from 'react'
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native'
import {useState} from "react"
import {CustomInput} from "../../../component/CustomInput"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {USER} from "../../../utils/Storage"
import {saveNote, note as noteApi} from "../../../utils/Api"
import {noteName} from "../../../utils/ScreenNames"
import {styles} from "../../../css/css"

export default function CreatorNote(params) {
    const note = (params.route.params || {note: undefined}).note || {id: -1, head: '', body: ''}

    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)
    const [errors, setErrors] = React.useState({})

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            let noteNew
            if (note.id == -1) {
                noteNew = JSON.stringify({"head": head, "body": body})
            } else {
                noteNew = JSON.stringify({id: note.id, "head": head, "body": body})
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: noteNew.toString()
            }
            fetch(saveNote, requestOptions)
                .then((data) => {
                    if (!('error' in data)) {
                        console.log("error add note: " + JSON.stringify(data))
                    } else {
                        Alert.alert("Ошибки при подключение к серверу " + data.status)
                    }
                })
                .catch((error) => alert(error))
        })
    }

    function deleteNote() {
        AsyncStorage.getItem(USER).then(data => {
            if (note.id != -1) {

                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': data
                    }
                }
                fetch(noteApi + `/${note.id}`, requestOptions)
                    .then((data) => {
                        console.log('delete note: ' + data)
                        params.navigation.popToTop(noteName)
                    })
                    .catch((error) => alert(error))
            } else {
                params.navigation.popToTop(noteName)
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <CustomInput
                    label={'Загаловок'}
                    value={head}
                    onChangeText={setHead}
                    iconName={'mail'}
                    error={errors.title}
                    placeholder="Загаловок ..."/>
                <CustomTextArea
                    label={'Текст'}
                    value={body}
                    onChangeText={setBody}
                    iconName={'lock-closed'}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст ..."/>
            </ScrollView>
            <View style={{paddingTop: '20%'}}>
                <CustomButton onPress={handlerSend} text="Сохранить"></CustomButton>
                <CustomButton onPress={deleteNote} text="Удалить"/>
            </View>
        </View>
    );
}