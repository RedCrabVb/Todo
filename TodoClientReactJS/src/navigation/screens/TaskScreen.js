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
import {ErrorView} from "../../component/ErrorView";

export default function TaskScreen({navigation}) {
    const [taskAll, setAllTask] = useState([])
    const [error, setError] = useState({enable: false, text: ''})

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                getItem(setAllTask, setError, smartTask)
            })
            return unsubscribe
        }
    )

    return (
        <View style={styles.container}>
            <ErrorView text={error.text} enable={error.enable}/>
            <CustomButton text="Создать задачу" onPress={() => navigation.navigate(createSmartTaskName)}/>
            <ScrollView style={{padding: '5%'}}>
                {taskAll.filter(t => t.completed == false).map(task => <SmartTask taskAll={taskAll} setAllTask={setAllTask} smartTask={task} key={task.id} navigation={navigation} />)}
                {
                    taskAll.filter(t => t.completed == true).length != 0 &&
                    <View>
                        <Text>Завершенные задания</Text>
                        {taskAll.filter(t => t.completed == true).map(task => <SmartTask taskAll={taskAll} setAllTask={setAllTask} smartTask={task} key={task.id} navigation={navigation} />)}
                    </View>
                }

            </ScrollView>
            <InfoButton text={'Метод SMART — это подход к постановке целей, который помогает выбрать формулировку желаемого результата. \nS - конкретный \nM - измеримый \nA - достижимый \nR - значимый \nT - ограничения'}/>

        </View>
    );
}

