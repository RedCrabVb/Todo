import {NOTE, USER} from "./Storage";
import {saveNote} from "./Api";
import { useNavigate } from "react-router-dom"


export function getItem(setItem, setError, api) {
    let data = localStorage.getItem(USER)
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data
        }
    }
    fetch(api, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then((data) => {
            console.log(data)
            setItem(data)
            localStorage.setItem(NOTE, JSON.stringify(data))
           
        }).catch(error => {
            console.log({error})

            if (error.message === 'Network request failed') {
                // AsyncStorage.getItem(NOTE).then(data => {
                //     console.log("Okey, load item from memory")
                //     console.log(data)
                //     setItem(JSON.parse(data))
                // })
            } else {
                setError({enable: true, text: error.message})
            }
    })

}

export function deleteItem(id, navigation, returnPageName, api) {
    const data = localStorage.getItem(USER)
    
    if (id != -1) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Authorization': data
            }
        }
        fetch(api + `/${id}`, requestOptions)
            .then((data) => {
                // navigation.popToTop(topPageName)
                navigation(returnPageName)
            })
            .catch((error) => alert(error))
    } else {
        // navigation.popToTop(topPageName)
        navigation(returnPageName)
    }
}


export function saveItem(item, changeID, api) {
    const data = localStorage.getItem(USER)
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data
        },
        body: JSON.stringify(item).toString()
    }
    fetch(api, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error(response.status)
            else return response.json()
        })
        .then((data) => {
            console.log(`save api ${api}: ` + JSON.stringify(data))
            changeID(data.id)
        })
        .catch((error) => { alert(error) })
}