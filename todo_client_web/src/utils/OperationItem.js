import {NOTE, USER} from "./Storage";
import {saveNote} from "./Api";
import { useNavigate } from "react-router-dom"


export function getItem(setItem, setError, api, local) {
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
            localStorage.setItem(local, JSON.stringify(data))
           
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

export function deleteItem(id, navigation, returnPageName, api, afterDelete = () => {}) {
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
                afterDelete()
            })
            .catch((error) => alert(error))
    } else {
        afterDelete()
    }
}


export function saveItem(item, changeID, api, afterUpdate = () => {}) {
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
            changeID(data.id)
            afterUpdate()
        })
        .catch((error) => { alert(error) })
}