import { Item } from "../components/class/Item";
import { Dispatch, SetStateAction } from "react";
import { NOTE, USER } from "../constants/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function getItem<E extends Item>(
    setItem: Dispatch<SetStateAction<E[]>>,
    setError: (f: { enable: boolean, text: string }) => void,
    api: string,
    local: string) {

    AsyncStorage.getItem(USER).then(data => {
        if (data == null) {
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: new Headers(
                {
                    'Content-Type': 'application/json',
                    'Authorization': data.toString()
                }
            ),
        }
        fetch(api, requestOptions)
            .then((response) => {
                if (!response.ok) throw new Error(response.status.toString());
                else return response.json();
            })
            .then((data) => {
                console.log(data)
                setItem(data)
                AsyncStorage.setItem(local, JSON.stringify(data))

            }).catch(error => {
                console.log({ error })

                if (error.message === 'Network request failed') {
                    AsyncStorage.getItem(NOTE).then(dataNote => {
                        if (dataNote == null) {
                            return;
                        }
                        console.log("Okey, load item from memory")
                        console.log(dataNote)
                        setItem(JSON.parse(dataNote))
                    })

                } else {
                    setError({ enable: true, text: error.message })
                }
            })
    })



}

export function deleteItem(id: number, api: string, afterDelete: () => void) {
    console.log(`ip = ${id} api = ${api}`)
    AsyncStorage.getItem(USER).then(data => {
        if (id != -1 && data != null) {
            const requestOptions = {
                method: 'DELETE',
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'Authorization': data.toString()
                    }
                ),
            }
            fetch(api + `/${id}`, requestOptions)
                .then((data) => {
                    afterDelete()
                })
                .catch((error) => alert(error))
        } else {
            afterDelete()
        }
    })


}


export function saveItem(item: any, changeID: (id: number) => void, api: string, afterUpdate: () => void = () => {}) {
    AsyncStorage.getItem(USER).then(data => {
        if (data != null) {
            const requestOptions = {
                method: 'POST',
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'Authorization': data.toString()
                    }
                ),
                body: JSON.stringify(item).toString()
            }
            fetch(api, requestOptions)
                .then((response) => {
                    if (!response.ok) throw new Error(response.status.toString())
                    else return response.json()
                })
                .then((data) => {
                    console.log({data})
                    changeID(data.id)
                    afterUpdate()
                })
                .catch((error) => { alert(error); afterUpdate() })
        }
    })


}