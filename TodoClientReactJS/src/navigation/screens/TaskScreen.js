import * as React from 'react'
import {View, Text, Vibration, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {styles} from "../../css/css"
import {useEffect, useState} from "react"
import {USER} from "../../utils/Storage"
import {createSmartTaskName, creatorNoteName} from "../../utils/ScreenNames";
import {CustomButton} from "../../component/CutomButton";
import {smartTask, allSmartTask} from "../../utils/Api";
import {SmartTask} from "../../component/SmartTask";

export default function TaskScreen({navigation}) {
    const [taskAll, setAllTask] = useState([])

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
                    fetch(smartTask, requestOptions)
                        .then((response) => {
                            if (!response.ok) JSON.parse("[]")
                            else return response.json()
                        })
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
            <CustomButton text="Создать задачу" onPress={() => navigation.navigate(createSmartTaskName)}/>
            <ScrollView style={{padding: '5%'}}>
                {taskAll.map(task => <SmartTask smartTask={task} key={task.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}

