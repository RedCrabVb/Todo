import * as React from 'react'
import {View, ScrollView} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {USER} from "../../../utils/Storage"
import {saveTimerTracker, timerTracker as timerTrackerApi} from "../../../utils/Api"
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'
import {TimeInput} from '../../../component/TimeInput'
import DatePicker from "react-native-datepicker";

export default function CreatorTimerTracker(params) {
    let task = (params.route.params || {TimerTracker: undefined}).time || {
        id: -1,
        nameTask: '',
        idSmartTask: -1,
        time: new Date()
    }

    const [id, setId] = useState(task.id)
    const [nameTask, setNameTask] = useState(task.nameTask)
    const [idSmartTask, setIdSmartTask] = useState(task.idSmartTask)
    const [time, setTime] = useState(task.time)

    const [errors, setErrors] = useState({})

    function handlerSend() {
        AsyncStorage.getItem(USER).then(data => {
            let timeNow
            if (id == -1) {
                timeNow = JSON.stringify({
                    "nameTask": nameTask,
                    "idSmartTask": idSmartTask,
                    "time": time
                })
            } else {
                timeNow = JSON.stringify({
                    "id": id,
                    "nameTask": nameTask,
                    "idSmartTask": idSmartTask,
                    "time": time
                })
            }
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data
                },
                body: timeNow.toString()
            }

            fetch(saveTimerTracker, requestOptions)
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

    function deleteTime() {
        AsyncStorage.getItem(USER).then(data => {
            if (id != -1) {
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Authorization': data
                    }
                }
                fetch(timerTrackerApi + `/${task.id}`, requestOptions)
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
                    label={'Действие'}
                    value={nameTask}
                    onChangeText={setNameTask}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст ..."/>
                <DatePicker
                    selected={time}
                    onChange={(date) => setTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />

                <View style={{paddingTop: 20}}>
                    <CustomButton onPress={handlerSend} text="Сохранить"/>
                    <CustomButton bcolor={'#d41b1b'} onPress={deleteTime} text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}

