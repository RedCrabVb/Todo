import React, { useEffect, useState } from 'react'
import { USER } from "../utils/Storage"
import { FormInput } from "../component/FormInput"
import { Button } from 'react-bootstrap'
import { authentication } from '../utils/Api'
import { useNavigate } from "react-router-dom"
import { ErrorView } from '../component/ErrorView'
import {routeHome, routeRegistration, routeLogin} from "../utils/ScreenNames"

export const LogIn = () => {
    const [login, setLogin] = useState('')
    const [password, setPasswordn] = useState('')

    const [error, setError] = React.useState({ enable: false, text: '' })
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
        setErrors(prevState => ({ ...prevState, [input]: error }));
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
                localStorage.setItem(USER, loginAndPassword)
                navigate(routeHome, { replace: true })
                console.log("Yes, bay by")
            })
            .catch((error) => {
                if (error.message == 401) {
                    setError({ enable: true, text: 'Не верный логин или пароль' })
                } else {
                    console.log(error + " in login")
                    // Alert.alert("Ошибка", "Ошибка при авторизации, попробуте:\n1) изменить данные \n2) сбросить кэш \n3) подключиться позже \n4) обратиться к администратору ")
                }
            })
    }

    function ErrorSpan({text}) {
        return (
            text != null ? <span className="containerError mb-3">{text}</span> : <br></br>
        )
    }

    return (
        <div className="containerForm col-md-6">

            <div className="col-md-6">
                <ErrorView text={error.text} enable={error.enable}/>
                <div className="mb-3">
                    <label className="form-label">Имя пользователя</label>
                    <ErrorSpan text={errors.email}/>
                    <input type="text" className="form-control" id="username"
                        value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="mb-3">
                    <ErrorSpan text={errors.password}/>
                    <label className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password"
                        value={password} onChange={(e) => setPasswordn(e.target.value)} />
                </div>
                <div className="mb-3">
                    <button onClick={validate} className="btn btn-primary mb-3 customButtons">Войти</button>
                    <button onClick={() => {navigate({routeRegistration}, { replace: true })}} className="btn btn-primary customButtons">Регистрация</button>
                </div>
            </div>

        </div>
    )
}