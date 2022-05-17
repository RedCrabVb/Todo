import {useEffect, useState} from 'react'
import {USER} from "../utils/Storage";
import {useNavigate} from "react-router-dom";
import {version} from '../utils/Api'
import React from 'react'

export const Home = () => {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')
    let navigate = useNavigate()

    function checkUser() {

        let data = localStorage.getItem(USER)
        if (data == null) {
            navigate("login", {replace: true})
        } else {
            isAuthorized(true)
            fetch(version)
                .then(d => d.json())
                .then(r => {
                    // console.log(r)
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
            <h1>Home</h1>
            <p>Test page</p>
            <p>v: {versionText}</p>
        </div>
    )
}