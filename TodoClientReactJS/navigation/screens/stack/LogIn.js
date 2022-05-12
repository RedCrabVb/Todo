import * as React from 'react'
import {View, Vibration, Alert, Keyboard} from 'react-native'
import {styles} from "../../../src/css/css"
import {CustomInput} from "../../../src/component/CustomInput"
import {useState} from "react"
import {CustomButton} from "../../../src/component/CutomButton"
import {USER} from "../../../src/utils/Storage"
import {taskName, mailResetName, registrationName, homeName} from '../../../src/utils/ScreenNames'
import {authentication} from "../../../src/utils/Api";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LogIn(props) {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = React.useState({})

    const validate = async () => {
        console.log("handler aut isValid")

        Keyboard.dismiss()
        let isValid = true
        if (mail.length < 4) {
            handleError('Почта должна быть длиннее 4 символов', 'email')
            isValid = false
        } else {
            handleError(null, 'email')
        }
        if (password.length < 4) {
            handleError('Пароль должен быть длиннее 4 символов', 'password')
            isValid = false
        } else {
            handleError(null, 'password')
        }
        if (isValid) {
            handlerAut()
        }
    }

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    }

    const handlerAut = () => {
        console.log("handler aut")
        const apiAut = `${authentication}?email=${mail}&password=${password}`;
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        fetch(apiAut, requestOptions)
            .then((response) => { console.log("api auth"); response.json()})
            .then((data) => {
                console.log(data)
                if ('error' in data) {
                    Alert.alert("Ошибка", "Ошибка при авторизации, попробуте:\n1) изменить данные \n2) сбросить кэш \n3) подключиться позже \n4) обратиться к администратору ")
                    Vibration.vibrate()
                } else {
                    AsyncStorage.setItem(USER, `${mail}:${password}`)
                    props.navigation.popToTop(homeName)
                }
            })
            .catch((error) => Alert.alert(error.status))
    }


    return (
        <View style={styles.container}>
            <CustomInput
                label={'Почта'}
                value={mail}
                onChangeText={setMail}
                iconName={'mail'}
                error={errors.email}
                placeholder="Ваш почта"/>
            <CustomInput
                label={'Пароль'}
                value={password}
                onChangeText={setPassword}
                iconName={'lock-closed'}
                password={true}
                error={errors.password}
                placeholder="Ваш пароль"/>
            <View style={{paddingTop: 20}}>
                <CustomButton
                    onPress={() => { console.log("wtf"); validate()}}
                    text="Войти"/>
                <CustomButton
                    text="Регистрация"
                    onPress={() => props.navigation.navigate(registrationName)} style={{bgColor: "red"}} ></CustomButton>
                <CustomButton
                    text="Востоновить пароль"
                    onPress={() => props.navigation.navigate(mailResetName)} style={{bgColor: "red"}}/>
            </View>
        </View>
    )
}
