import {useEffect, useState} from 'react'
import {USER} from "../utils/Storage";

export const LogIn = () => {

    return (
        <div>
            <h1>LogIn</h1>
            <p>Login</p>
            <input type={"text"}/>
            <p>Password</p>
            <input type={"text"}/>
            <br/>
            <button>Log In</button>
        </div>
    )
}