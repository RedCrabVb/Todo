import * as React from 'react'
import {View, Text, ScrollView, Alert} from 'react-native'
import {useState} from "react"
import {CustomInput} from "../../../src/component/CustomInput";
import {CustomButton} from "../../../src/component/CutomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../../src/utils/Storage";
import {addNote, authentication} from "../../../src/utils/Api";

export default function CreatorTest({navigation}) {
    const [head, setHead] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = React.useState({})

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            let note = JSON.stringify({"head": head, "body": body})
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