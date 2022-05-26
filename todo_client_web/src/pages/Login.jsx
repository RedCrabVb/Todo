import React, {useEffect, useState} from 'react'
import {USER} from "../utils/Storage"
import {FormInput} from "../component/FormInput"
import { Button } from 'react-bootstrap'
import {authentication} from '../utils/Api'
import { useNavigate } from "react-router-dom"

export const LogIn = () => {
    const [login, setLogin] = useState('')
    const [password, setPasswordn] = useState('')

    const [error, setError] = React.useState({enable: false, text: ''})
    const [errors, setErrors] = React.useState({})

    const navigate = useNavigate()

    const validate = async () => {
        console.log("handler aut isValid")

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
        let loginAndPassword = 'Basic ' + window.btoa(login + ":" + password)

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
                // AsyncStorage.setItem(USER, loginAndPassword)
                // props.navigation.popToTop(homeName)
                localStorage.setItem(USER, loginAndPassword)
                navigate("/", { replace: true })
                console.log("Yes, bay by")
            })
            .catch((error) => {
                if (error.message == 401){
                    setError({enable: true, text: 'Не верный логин или пароль'})
                } else {
                    console.log(error + " in login")
                    // Alert.alert("Ошибка", "Ошибка при авторизации, попробуте:\n1) изменить данные \n2) сбросить кэш \n3) подключиться позже \n4) обратиться к администратору ")
                }
            })
    }

    return (
        <div className="containerForm">

            <div>
                <div className="mb-3">
                    <label className="form-label">Имя пользователя</label>
                    <input type="text" className="form-control" id="username"
                        value={login} onChange={(e) => setLogin(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password"
                     value={password} onChange={(e) => setPasswordn(e.target.value)}/>
                </div>
                <button onClick={validate} className="btn btn-primary">Отправить</button>
            </div>

        </div>
    )
}