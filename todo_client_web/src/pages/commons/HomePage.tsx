import {useEffect, useId, useState} from 'react'
import {USER} from "../../utils/Storage";
import {useNavigate} from "react-router-dom";
import {version, userInfo as userInfoApi} from '../../utils/Api'
import React from 'react'
import {Header} from './Header'

interface UserInfo {
    email: string;
    username: string;
    chatIdTg: string;
    confirmedTg: string;
    secretTokenTg: string;
}

export const Home = () => {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined)
    const navigate = useNavigate()

    function checkUser() {

        const data: string = localStorage.getItem(USER) || 'null'
    
        const requestOptions = {
            method: 'GET',
            headers: new Headers(
                { 
                    'Content-Type': 'application/json', 
                    'Authorization': data.toString()
                }
            ),
        }

        const userInfo = localStorage.getItem(USER)

        if (userInfo == null) {
            navigate("login", {replace: true})
        } else {
            console.log({userInfo})
            isAuthorized(true)
            fetch(version)
                .then(d => d.json())
                .then(r => {
                    setVersion(r)
                })
            fetch(userInfoApi, requestOptions)
                .then(d => d.json())
                .then(r => {
                    console.log(r)
                    setUserInfo(r)
                })
        }
    }

    useEffect(() => {
            if (!authorized) {
                checkUser()
            }
        }
    );


    return (
        <div>
            <Header/>
            <h1>Home</h1>
            {
                userInfo ? <>
                    <p>Почта: {userInfo.email}</p>
                    <p>Логин: {userInfo.username}</p>
                    {userInfo.secretTokenTg != null && !userInfo.confirmedTg ? 
                      <p>Код для подписки бота: {userInfo.secretTokenTg}</p>
                    : <></> 
                    }
                    
                    <p>Оповещения в телеграмме активированы = {userInfo.confirmedTg.toString()}</p>
                </> : <></>
            }
            <a href={"https://t.me/note_30_05_bot"}>Telegram bot</a>

            <p>api: v: {versionText}</p>
        </div>
    )
}