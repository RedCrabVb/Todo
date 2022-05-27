import {useEffect, useState} from 'react'
import {USER} from "../utils/Storage";
import {useNavigate} from "react-router-dom";
import {version} from '../utils/Api'
import React from 'react'
import {Header} from './Header'

export const Home = () => {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')
    const navigate = useNavigate()

    function checkUser() {

        let userInfo = localStorage.getItem(USER)
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
            <p>Test page</p>
            <p>v: {versionText}</p>
        </div>
    )
}