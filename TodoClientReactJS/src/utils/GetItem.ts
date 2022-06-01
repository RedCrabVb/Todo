import {NOTE, USER} from "./Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                AsyncStorage.setItem(NOTE, JSON.stringify(data)).then(r => console.log("Okey, load item"))
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