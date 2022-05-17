import * as React from 'react'
import {View, ScrollView} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {USER} from "../../../utils/Storage"
import {saveSmartTask, smartTask as smartTaskApi} from "../../../utils/Api"
import DatePicker from 'react-native-datepicker'
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'

function getDate() {
    const date = new Date()
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
}

export default function CreatorSmartTask(params) {
    // private String specific; //конкретный
    // private String measurable; //измеримый
    // private String achievable; //достижимый
    // private String relevant; //значемый
    // private String timeBound; //ограничения

    let task = (params.route.params || {task: undefined}).task || {
        id: -1,
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timeBound: getDate()
    }

    const [id, setId] = useState(task.id)
    const [specific, setSpecific] = useState(task.specific)
    const [measurable, setMeasurable] = useState(task.measurable)
    const [achievable, setAchievable] = useState(task.achievable)
    const [relevant, setRelevant] = useState(task.relevant)
    const [timeBound, setTimeBound] = useState(task.timeBound)

    const [errors, setErrors] = useState({})

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            let taskNow
            if (id == -1) {
                taskNow = JSON.stringify({
                    "specific": specific,
                    "measurable": measurable,
                    "achievable": achievable,
                    "relevant": relevant,
                    "timeBound": timeBound
                })
            } else {
                taskNow = JSON.stringify({
                    "id": id,
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

            fetch(saveSmartTask, requestOptions)
                .then((response) => {
                    if (!response.ok) throw new Error(response.status);
                    else return response.json();
                })
                .then((data) => {
                    console.log("Save smart task:" + JSON.stringify(data))
                    setId(data.id)
                })
                .catch((error) => {
                    alert(error)
                })
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
                fetch(smartTaskApi + `/${task.id}`, requestOptions)
                    .then((data) => {
                        params.navigation.popToTop()
                    })
                    .catch((error) => alert(error))
            } else {
                params.navigation.popToTop(taskName)
            }
        })
    }

    return (
        <View style={[{flex: 1}, styles.container]}>
            <ScrollView>
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
                <View style={{paddingTop: 20, paddingHorizontal: 10, margin: 20}}>
                    <DatePicker
                        date={timeBound}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => {
                            setTimeBound(date)
                        }}
                    />

                </View>
                <View style={{paddingTop: 20}}>
                    <CustomButton onPress={handlerSend} text="Сохранить"/>
                    <CustomButton onPress={deleteTask} text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}

