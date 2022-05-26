import React from 'react'
import {editNoteName} from "../utils/ScreenNames";

export const ErrorView = ({text, enable = false}) => {

    if (enable) {
        console.log("ErrorView: is " + enable)
        return (
            <div className="containerError">
                <p>Error: {text}</p>
            </div>
        )
    } else {
        return (<div></div>)
    }
}
