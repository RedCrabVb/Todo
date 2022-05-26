import React, { useEffect, useState } from 'react'
import { USER } from "../utils/Storage"
import { FormInput } from "../component/FormInput"
import { Button } from 'react-bootstrap'
import { registration } from '../utils/Api'
import { useNavigate } from "react-router-dom"
import { ErrorView } from '../component/ErrorView'
import {routeHome, routeRegistration, routeLogin} from "../utils/ScreenNames"

export const Registration = () => {
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [mail, setMail] = useState("")
    const [login, setLogin] = useState("")

    const [errors, setErrors] = React.useState({})
    const [error, setError] = React.useState({enable: false, text: ''})

    const navigate = useNavigate()

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
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `login=${login}&email=${mail}&password=${password}`
        };
        fetch(registration, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response;
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem(USER, 'Basic ' + window.btoa(login + ":" + password))
                navigate(routeHome, { replace: true })
            })
            .catch((error) => {
                console.log(error + " in registration")
                setError({enable: true, text: 'Попробуйте ввести другой логин или повторить попытку регистрации позднее'})
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
                <div className="mb-2">
                    <label className="form-label">Имя пользователя</label>
                    <ErrorSpan text={errors.login}/>
                    <input type="text" className="form-control" id="username"
                        value={login} onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label className="form-label">Почта</label>
                    <ErrorSpan text={errors.mail}/>
                    <input type="text" className="form-control" id="username"
                        value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className="mb-2">
                    <ErrorSpan text={errors.password}/>
                    <label className="form-label">Пароль</label>
                    <input type="password" className="form-control" id="password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-2">
                    <ErrorSpan text={errors.password2}/>
                    <label className="form-label">Пароль ещё раз</label>
                    <input type="password" className="form-control" id="password"
                        value={password2} onChange={(e) => setPassword2(e.target.value)} />
                </div>
                <div className="mb-2">
                    <button onClick={validate} className="btn btn-primary mb-3 customButtons">Регистрация</button>
                </div>
            </div>

        </div>
    )
    
}