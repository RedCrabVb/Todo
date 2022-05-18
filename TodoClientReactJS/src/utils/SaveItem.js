import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "./Storage";
import {saveNote} from "./Api";

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
            .catch((error) => alert(error))
    })
}