import * as React from 'react'
import {View, Text, Alert, Vibration, Keyboard} from 'react-native'
import {styles} from "../../../src/css/css"
import {CustomInput} from "../../../src/component/CustomInput"
import {CustomButton} from "../../../src/component/CutomButton"
import {useState} from "react"
import {USER} from "../../../src/utils/Storage";
import {homeName, registrationName} from "../../../src/utils/ScreenNames";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Registration(props) {

    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [mail, setMail] = useState("")
    const [login, setLogin] = useState("")

    const [errors, setErrors] = React.useState({})

    const validate = async () => {
        let isValid = true

        function check(check, text, field) {
            if (check) {
                handleError(text, field)
                isValid = false
            } else {
                handleError(null, field)
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

    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    }

    const handlerAut = () => {
        const apiReg = `${registrationName}?login=${login}&email=${mail}&password=${password}`
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token: user.token})
        };
        fetch(apiReg, requestOptions)
            .then((response) => { console.log(response); response.json() })
            .then((data) => {
                console.log(data);
                if (!('error' in data)) {
                    AsyncStorage.setItem(USER, `${mail}:${password}`)
                    // AsyncStorage.setItem(USER, JSON.stringify(data))
                } else {
                    Alert.alert("Ошибки при подключение к серверу " + data.status)
                }
            })
            .catch((error) => alert(error))
            .finally(() => props.navigation.popToTop(homeName))
    }

    return (
        <View style={styles.container}>
            <CustomInput
                label={'Логин'}
                value={login}
                onChangeText={setLogin}
                iconName={'people'}
                error={errors.login}
                placeholder="Ваш логин"/>

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

            <CustomInput
                value={password2}
                onChangeText={setPassword2}
                iconName={'lock-closed'}
                password={true}
                error={errors.password2}
                placeholder="Повторите пароль ещё раз"/>

            <View style={{paddingTop: 20}}>
                <CustomButton onPress={validate} text="Регистрация"></CustomButton>
            </View>
        </View>
    );
}

