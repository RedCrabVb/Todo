import * as React from 'react'
import {View, Text, TouchableHighlight, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {styles} from "../../css/css"
import {useEffect, useState} from "react"
import {SMART_TASK, USER} from "../../utils/Storage"
import {createSmartTaskName, creatorNoteName} from "../../utils/ScreenNames";
import {CustomButton} from "../../component/CutomButton";
import {smartTask} from "../../utils/Api";
import {SmartTask} from "../../component/SmartTask";
import Icon from "react-native-vector-icons/Ionicons";
import {InfoButton} from "../../component/InfoButton";
import {getItem} from "../../utils/GetItem";

export default function TaskScreen({navigation}) {
    const [taskAll, setAllTask] = useState([])

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                getItem(setAllTask, (x) => {console.log("error task screen get item")}, smartTask)
                // AsyncStorage.getItem(USER).then(data => {
                //     const requestOptions = {
                //         method: 'GET',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': data
                //         }
                //     }
                //     fetch(smartTask, requestOptions)
                //         .then((response) => {
                //             if (!response.ok) JSON.parse("[]")
                //             else return response.json()
                //         })
                //         .then((data) => {
                //             console.log("tasks: " + JSON.stringify(data))
                //             if (!('error' in data)) {
                //                 setAllTask(data)
                //                 AsyncStorage.setItem(SMART_TASK, JSON.stringify(data)).then(r => console.log("Okey, save smart task"))
                //             }
                //         })
                // })

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
            <InfoButton text={'Метод SMART — это подход к постановке целей, который помогает выбрать формулировку желаемого результата. \nS - конкретный \nM - измеримый \nA - достижимый \nR - значимый \nT - ограничения'}/>

        </View>
    );
}

