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
import {ErrorView} from "../../component/ErrorView";

export default function TimeScreen({navigation}) {
    const [timeAll, setTimeTracker] = useState([])
    const [error, setError] = useState({enable: false, text: ''})

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                getItem(setTimeTracker, setError, timerTracker)
            })
            return unsubscribe
        }
    )

    return (
        <View style={styles.container}>
            <ErrorView text={error.text} enable={error.enable}/>
            <CustomButton text="Добавить время" onPress={() => navigation.navigate(createTimerTrackerName)}/>
            <ScrollView style={{padding: '5%'}}>
                {timeAll.map(time => <TimeTracker timeTracker={time} key={time.id} navigation={navigation} />)}
            </ScrollView>
        </View>
    );
}

