import * as React from 'react'
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native'
import {useState} from "react"
import {CustomInput} from "../../../src/component/CustomInput";
import {CustomButton} from "../../../src/component/CutomButton";
import {CustomTextArea} from "../../../src/component/CustomTextArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../../src/utils/Storage";
import {addNote, addSmartTask, allNote, deleteTask as deleteTaskApi} from "../../../src/utils/Api";

export default function CreatorSmartTask(params) {
    // private String specific; //конкретный
    // private String measurable; //измеримый
    // private String achievable; //достижимый
    // private String relevant; //значемый
    // private String timeBound; //ограничения

    const task = (params.route.params || {task: undefined}).task || {id: -1, specific: '', measurable: '', achievable: '', relevant: '', timeBound: ''}

    const [specific, setSpecific] = useState(task.specific)
    const [measurable, setMeasurable] = useState(task.measurable)
    const [achievable, setAchievable] = useState(task.achievable)
    const [relevant, setRelevant] = useState(task.relevant)
    const [timeBound, setTimeBound] = useState(task.timeBound)

    const [errors, setErrors] = React.useState({})

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            let taskNow
            if (task.id == -1) {
                taskNow = JSON.stringify({
                    "specific": specific,
                    "measurable": measurable,
                    "achievable": achievable,
                    "relevant": relevant,
                    "timeBound": timeBound
                })
            } else {
                taskNow = JSON.stringify({
                    "id": task.id,
                    "specific": specific,
                    "measurable": measurable,
                    "achievable": achievable,
                    "relevant": relevant,
                    "timeBound": timeBound
                })
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: taskNow.toString()
            }
            fetch(addSmartTask, requestOptions)
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => alert(error))
        })
    }

    function deleteTask() {
        AsyncStorage.getItem(USER).then(data => {
            if (task.id != -1) {

                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': data
                    }
                }
                fetch(deleteTaskApi + `/${task.id}`, requestOptions)
                    .then((data) => {
                        console.log('delete task: ' + data)
                        params.navigation.popToTop(allNote)
                    })
                    .catch((error) => alert(error))
            } else {
                params.navigation.popToTop(allNote)
            }
        })
    }

    return (
        <View>
            <CustomTextArea
                label={'S'}
                value={specific}
                onChangeText={setSpecific}
                iconName={'lock-closed'}
                error={errors.body}
                multiline={true}
                placeholder="Ваш текст ..."/>
            <CustomTextArea
                label={'M'}
                value={measurable}
                onChangeText={setMeasurable}
                iconName={'lock-closed'}
                error={errors.body}
                multiline={true}
                placeholder="Ваш текст ..."/>
            <CustomTextArea
                label={'A'}
                value={achievable}
                onChangeText={setAchievable}
                iconName={'lock-closed'}
                error={errors.body}
                multiline={true}
                placeholder="Ваш текст ..."/>
            <CustomTextArea
                label={'R'}
                value={relevant}
                onChangeText={setRelevant}
                iconName={'lock-closed'}
                error={errors.body}
                multiline={true}
                placeholder="Ваш текст ..."/>
            <CustomTextArea
                label={'T'}
                value={timeBound}
                onChangeText={setTimeBound}
                iconName={'lock-closed'}
                error={errors.body}
                multiline={true}
                placeholder="Ваш текст ..."/>

            <View style={{paddingTop: 20, justifyContent: 'flex-end'}}>
                <CustomButton onPress={handlerSend} text="Сохранить"></CustomButton>
                <CustomButton onPress={deleteTask} text="Удалить"/>
            </View>
        </View>
    );
}