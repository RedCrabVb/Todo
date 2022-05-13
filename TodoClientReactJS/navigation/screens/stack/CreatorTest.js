import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {useState} from "react"
import {CustomInput} from "../../../src/component/CustomInput";
import {CustomButton} from "../../../src/component/CutomButton";
import {CustomTextArea} from "../../../src/component/CustomTextArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../../src/utils/Storage";
import {addNote, authentication} from "../../../src/utils/Api";

export default function CreatorTest(params) {
    // if ('note' in params) {
    //     console.log('load note ' + JSON.stringify(params.note))
    // }
    console.log('load params ' + JSON.stringify(params.route.params))
    const note = (params.route.params || {note: undefined}).note || {id: -1, head: '', body: ''}
    console.log("load note " + note)

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
            fetch(addNote, requestOptions)
                .then((data) => {
                    console.log(data)
                    if (!('error' in data)) {
                        console.log(data)
                    } else {
                        Alert.alert("Ошибки при подключение к серверу " + data.status)
                    }
                })
                .catch((error) => alert(error))
        })
    }

    return (
        <View>
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

            <View style={{paddingTop: 20}}>
                <CustomButton onPress={handlerSend} text="Сохранить"></CustomButton>
            </View>
        </View>
    );
}