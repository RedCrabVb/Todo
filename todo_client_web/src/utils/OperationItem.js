import {NOTE, USER} from "./Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {saveNote} from "./Api";

export function getItem(setItem, setError, api) {
    AsyncStorage.getItem(USER).then(data => {
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
                localStorage.setItem(NOTE, JSON.stringify(data)).then(r => console.log("Okey, load item"))
            }).catch(e => {
                console.log(e)

                if (error.message === 'Network request failed') {
                    AsyncStorage.getItem(NOTE).then(data => {
                        console.log("Okey, load item from memory")
                        console.log(data)
                        setItem(JSON.parse(data))
                    })
                } else {
                    setError({enable: true, text: e.message})
                }
        })
    })

}

export function deleteItem(id, navigation, topPageName, api) {
    AsyncStorage.getItem(USER).then(data => {
        if (id != -1) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': data
                }
            }
            fetch(api + `/${id}`, requestOptions)
                .then((data) => {
                    navigation.popToTop(topPageName)
                })
                .catch((error) => alert(error))
        } else {
            navigation.popToTop(topPageName)
        }
    })
}


export function saveItem(item, changeID, api) {
    AsyncStorage.getItem(USER).then(data => {
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
    })
}