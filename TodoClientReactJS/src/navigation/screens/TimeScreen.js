import * as React from 'react'
import {View, Text, Vibration, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {styles} from "../../css/css"
import {useEffect, useState} from "react"
import {SMART_TASK, TIMER_TRACKER, USER} from "../../utils/Storage"
import {createSmartTaskName, createTimerTrackerName, creatorNoteName} from "../../utils/ScreenNames";
import {CustomButton} from "../../component/CutomButton";
import {smartTask, timerTracker} from "../../utils/Api";
import {TimeTracker} from "../../component/TimeTracker";
import {getItem} from "../../utils/GetItem";

export default function TimeScreen({navigation}) {
    const [timeAll, setTimeTracker] = useState([])

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                getItem(setTimeTracker, (x) => {console.log("error in set item TimeScreen")}, timerTracker)
                // AsyncStorage.getItem(USER).then(data => {
                //     const requestOptions = {
                //         method: 'GET',
                //         headers: {
                //             'Content-Type': 'application/json',
                //             'Authorization': data
                //         }
                //     }
                //     fetch(timerTracker, requestOptions)
                //         .then((response) => {
                //             if (!response.ok) JSON.parse("[]")
                //             else return response.json()
                //         })
                //         .then((data) => {
                //             console.log("tasks: " + JSON.stringify(data))
                //             if (!('error' in data)) {
                //                 setTimeTracker(data)
                //                 AsyncStorage.setItem(TIMER_TRACKER, JSON.stringify(data)).then(r => console.log("Okey, save time tracker"))
                //             }
                //         })
                // })

            })
            return unsubscribe
        }
    )

    return (
        <View style={styles.container}>
            <CustomButton text="Добавить время" onPress={() => navigation.navigate(createTimerTrackerName)}/>
            <ScrollView style={{padding: '5%'}}>
                {timeAll.map(time => <TimeTracker timeTracker={time} key={time.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}

