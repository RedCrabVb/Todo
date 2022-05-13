import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import {useState} from "react"
import {styles} from "../../src/css/css"
import {CustomInput} from "../../src/component/CustomInput";
import {CustomButton} from "../../src/component/CutomButton";
import {homeName, logInName, registrationName} from "../../src/utils/ScreenNames";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../src/utils/Storage";
import {addNote, authentication} from "../../src/utils/Api";

export default function NoteScreen({navigation}) {
    const [head, setHead] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = React.useState({})


    // React.useEffect(() => {
    //         const unsubscribe = navigation.addListener('focus', () => {
    //             fetch(testAll)
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     console.log("test: " + JSON.stringify(data))
    //                     if (!('error' in data)) {
    //                         setTests(data)
    //                     }
    //                 })
    //         });
    //         return unsubscribe
    //     }
    // );

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            // let base64 = require('base-64')
            // let loginAndPassword = 'Basic ' + base64.encode('test' + ":" + '1234')
            let note = JSON.stringify({"head": head, "body": body})
            console.log(note)
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: note.toString()
            }
            fetch(addNote, requestOptions)
                .then((data) => {
                    console.log(data)
                    if (!('error' in data)) {
                        // AsyncStorage.setItem(USER, JSON.stringify(data))
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
            <CustomInput
                label={'Текст'}
                value={body}
                onChangeText={setBody}
                iconName={'lock-closed'}
                error={errors.body}
                placeholder="Ваш текст ..."/>

            <View style={{paddingTop: 20}}>
                <CustomButton onPress={handlerSend} text="Сохранить"></CustomButton>
            </View>
        </View>
    );
}