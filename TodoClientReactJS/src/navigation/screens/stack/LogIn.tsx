import * as React from 'react'
import {View, Vibration, Alert, Keyboard} from 'react-native'
import {styles} from "../../../css/css"
import {CustomInput} from "../../../component/CustomInput"
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {USER} from "../../../utils/Storage"
import {taskName, mailResetName, registrationName, homeName} from '../../../utils/ScreenNames'
import {authentication} from "../../../utils/Api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ErrorView} from "../../../component/ErrorView";

export default function LogIn(props) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = React.useState({enable: false, text: ''})
    const [errors, setErrors] = React.useState({})

    const validate = async () => {
        console.log("handler aut isValid")

        Keyboard.dismiss()
        let isValid = true
        if (login.length < 4) {
            handleError('Логин должен быть длиннее 4 символов', 'email')
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
        let base64 = require('base-64')
        let loginAndPassword = 'Basic ' + base64.encode(login + ":" + password)

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': loginAndPassword
            }
        }
        fetch(authentication, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response;
            })
            .then((data) => {
                AsyncStorage.setItem(USER, loginAndPassword)
                props.navigation.popToTop(homeName)
            })
            .catch((error) => {
                if (error.message == 401){
                    setError({enable: true, text: 'Не верный логин или пароль'})
                } else {
                    console.log(error + " in login")
                    Alert.alert("Ошибка", "Ошибка при авторизации, попробуте:\n1) изменить данные \n2) сбросить кэш \n3) подключиться позже \n4) обратиться к администратору ")
                }
            })
    }


    return (
        <View style={styles.container}>
            <ErrorView text={error.text} enable={error.enable}/>
            <CustomInput
                label={'Почта'}
                value={login}
                onChangeText={setLogin}
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
                    onPress={() => {
                        console.log("wtf");
                        validate()
                    }}
                    text="Войти"/>
                <CustomButton
                    text="Регистрация"
                    onPress={() => props.navigation.navigate(registrationName)} style={{bgColor: "red"}}></CustomButton>
                <CustomButton
                    text="Востоновить пароль"
                    onPress={() => alert("Данный функционал не реализован")} style={{bgColor: "red"}}/>
            </View>
        </View>
    )
}
