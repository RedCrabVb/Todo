import * as React from 'react'
import { View, Text, Alert, StyleSheet, Keyboard } from 'react-native'
import { useState } from "react"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../constants/Api';
import { CustomButton, CustomInput, ErrorView } from '../components/CustomElement';
import { USER } from '../constants/Storage';
import { RootTabScreenProps } from '../types';
import base64 from 'react-native-base64';


export default function Registration({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [mail, setMail] = useState("")
    const [login, setLogin] = useState("")

    const [errors, setErrors] = React.useState({ login: undefined, mail: undefined, password: undefined, password2: undefined })
    const [error, setError] = React.useState({ enable: false, text: '' })

    const validate = async () => {
        let isValid = true

        function check(check: boolean, text: string, field: string) {
            if (check) {
                handleError(text, field)
                isValid = false
            } else {
                handleError(undefined, field)
            }
        }

        Keyboard.dismiss()

        check(mail.length < 4, 'Почта должна быть длиннее 4 символов', 'email')
        check(login.length < 4, 'Логин должен быть длиннее 4 символов', 'login')
        check(password != password2, 'Пароли должны быть одинаковы', 'password2')
        check(password.length < 4, 'Пароль должен быть длиннее 4 символов', 'password')

        if (isValid) {
            handlerAut()
        }
    }

    const handleError = (error: string | undefined, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    }

    const handlerAut = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `login=${login}&email=${mail}&password=${password}`
        };
        fetch(api.registration, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
                else return response;
            })
            .then((data) => {
                console.log(data)
                AsyncStorage.setItem(USER, 'Basic ' + base64.encode(login + ":" + password))
                navigation.navigate('TabOne')
            })
            .catch((error) => {
                console.log(error + " in registration")
                setError({ enable: true, text: 'Попробуйте ввести другой логин или повторить попытку регистрации позднее' })
            })
    }

    return (
        <View style={style.container}>
            <ErrorView text={error.text} enable={error.enable} />
            <CustomInput
                label={'Логин'}
                value={login}
                onChangeText={setLogin}
                iconName={'user'}
                error={errors.login}
                placeholder="Ваш логин" />

            <CustomInput
                label={'Почта'}
                value={mail}
                onChangeText={setMail}
                iconName={'mail'}
                error={errors.mail}
                placeholder="Ваш почта" />
            <CustomInput
                label={'Пароль'}
                value={password}
                onChangeText={setPassword}
                iconName={'lock'}
                password={true}
                error={errors.password}
                placeholder="Ваш пароль" />

            <CustomInput
                value={password2}
                onChangeText={setPassword2}
                iconName={'lock'}
                password={true}
                error={errors.password2}
                placeholder="Повторите пароль ещё раз" />

            <View style={{ paddingTop: 20 }}>
                <CustomButton onPress={validate} text="Регистрация"></CustomButton>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: '20%',
        paddingVertical: '15%'
    }
})