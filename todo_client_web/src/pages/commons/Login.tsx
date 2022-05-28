import React, { useEffect, useState } from 'react'
import { USER } from "../../utils/Storage"
import { authentication } from '../../utils/Api'
import { useNavigate } from "react-router-dom"
import { ErrorView } from '../../component/ErrorView'
import { routeHome, routeRegistration, routeLogin } from "../../utils/ScreenNames"

export const LogIn = () => {
    const [login, setLogin] = useState('')
    const [password, setPasswordn] = useState('')

    const [error, setError] = React.useState({ enable: false, text: '' })
    const [errors, setErrors] = React.useState({email: undefined, password: undefined})

    const navigate = useNavigate()

    const validate = async () => {
        console.log("handler aut isValid")

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
        let loginAndPassword = 'Basic ' + window.btoa(login + ":" + password)

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': loginAndPassword
            }
        }
        fetch(authentication, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
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
                }
            })
    }

    function ErrorSpan({ text }: {text: string | undefined}) {
        return (
            text != null ? <span className="containerError mb-3">{text}</span> : <br></br>
        )
    }

    function elementInput(value: string, setValue: (f: string) => void, name: string, error_text: string | undefined) {
        return (
            <div className="mb-3">
                <label className="form-label">{name}</label>
                <ErrorSpan text={error_text} />
                <input type="text" className="form-control" id="username"
                    value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        )
    }

    return (
        <div className="containerForm col-md-6">

            <div className="col-md-6">
                <ErrorView text={error.text} enable={error.enable} />
                {elementInput(login, setLogin, 'Логин', errors.email)}
                {elementInput(password, setPasswordn, 'Почта', errors.password)}

                <div className="mb-3">
                    <button onClick={validate} className="btn btn-primary mb-3 customButtons">Войти</button>
                    <button onClick={() => { navigate(routeRegistration, { replace: true }) }} className="btn btn-primary customButtons">Регистрация</button>
                </div>
            </div>

        </div>
    )
}