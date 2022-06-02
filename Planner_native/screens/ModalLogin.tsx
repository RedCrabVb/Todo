import * as React from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { useState } from 'react';
import { USER } from '../constants/Storage';
import { api } from '../constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomInput, CustomButton, ErrorView } from '../components/CustomElement';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import base64 from 'react-native-base64'

export default function LogIn({navigation}: RootTabScreenProps<'TabOne'>) {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = React.useState({ enable: false, text: '' })
    const [errors, setErrors] = React.useState({})

    const validate = async () => {
        console.log("handler aut isValid")

        Keyboard.dismiss()
        let isValid = true
        if (login.length < 4) {
            handleError('Логин должен быть длиннее 4 символов', 'email')
            isValid = false
        } else {
            handleError(undefined, 'email')
        }
        if (password.length < 4) {
            handleError('Пароль должен быть длиннее 4 символов', 'password')
            isValid = false
        } else {
            handleError(undefined, 'password')
        }
        if (isValid) {
            handlerAut()
        }
    }

    const handleError = (error: string | undefined, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    }

    const handlerAut = () => {
        let loginAndPassword = 'Basic ' + base64.encode(login + ":" + password)

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': loginAndPassword
            }
        }
        fetch(api.authentication, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
                else return response;
            })
            .then((data) => {
                localStorage.setItem(USER, loginAndPassword)
                navigation.navigate('TabOne')
                console.log("Yes, bay by")
            })
            .catch((error) => {
                if (error.message == 401) {
                    setError({ enable: true, text: 'Не верный логин или пароль' })
                } else {
                    console.log(error + " in login")
                }
            })
    }

    return (
        <View style={style.container}>
            <ErrorView text={error.text} enable={error.enable} />
            <CustomInput
                label={'Почта'}
                value={login}
                onChangeText={setLogin}
                iconName={'mail'}
                // error={errors.email}
                placeholder="Ваш почта" />
            <CustomInput
                label={'Пароль'}
                value={password}
                onChangeText={setPassword}
                iconName={'lock'}
                password={true}
                // error={errors.password}
                placeholder="Ваш пароль" />
            <View style={{ paddingTop: 20 }}>
                <CustomButton
                    onPress={() => {
                        validate()
                    }}
                    text="Войти" />
                <CustomButton
                    text="Регистрация"
                    onPress={() => navigation.navigate('RegistrationModal')}></CustomButton>
                <CustomButton
                    text="Востоновить пароль"
                    onPress={() => alert("Данный функционал не реализован")} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: '20%',
        paddingVertical: '15%'
    }
})