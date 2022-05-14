import * as React from 'react'
import {View, Text, Vibration, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {styles} from "../../css/css"
import {useEffect, useState} from "react"
import {USER} from "../../utils/Storage"
import {createSmartTaskName, creatorNoteName} from "../../utils/ScreenNames";
import {CustomButton} from "../../component/CutomButton";
import {allNote, allSmartTask} from "../../utils/Api";
import {SmartTask} from "../../component/SmartTask";

export default function TaskScreen({navigation}) {
    const [login, setLogin] = useState("")
    const [mail2, setMail2] = useState("")
    const [taskAll, setAllTask] = useState([])

    // React.useEffect(() => {
    //         const unsubscribe = navigation.addListener('focus', () => {
    //             AsyncStorage.getItem(USER).then(data => {
    //                 if (data != null) {
    //                     const user = (JSON.parse(data))
    //                     if (user.login != "") {
    //                         setLogin(user.login);
    //                         setMail2(user.email);
    //                     } else {
    //                         setLogin("Нет данных")
    //                         setMail2("Нет данных")
    //                     }
    //                 } else {
    //                     setLogin("Нет данных")
    //                     setMail2("Нет данных")
    //                 }
    //             });
    //             console.log("userEffect TaskScreen")
    //         });
    //         return unsubscribe
    //     }
    // )


    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                AsyncStorage.getItem(USER).then(data => {
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': data
                        }
                    }
                    fetch(allSmartTask, requestOptions)
                        .then((response) => {console.log(response.body); if (response.body != null) { return response.json() } else {return JSON.parse("[]")}})
                        .then((data) => {
                            console.log("tasks: " + JSON.stringify(data))
                            if (!('error' in data)) {
                                setAllTask(data)
                            }
                        })
                })

            })
            return unsubscribe
        }
    )

    return (
        <View style={styles.container}>
            <Text style={styles.textBig}>Логин: {login}</Text>
            <Text style={styles.textBig}>Почта: {mail2}</Text>
            <CustomButton text="Создать задачу" onPress={() => navigation.navigate(createSmartTaskName)}/>
            <ScrollView style={{padding: '5%'}}>
                {taskAll.map(task => <SmartTask smartTask={task} key={task.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}

