import * as React from 'react'
import {View, ScrollView} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import {saveTimerTracker, timerTracker as timerTrackerApi} from "../../../utils/Api"
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'
import {deleteItem} from "../../../utils/DeleteItem";
import {saveItem} from "../../../utils/SaveItem";
import DatePicker from "@react-native-community/datetimepicker";
import {CustomInput} from "../../../component/CustomInput";

class TimerTracker {
    constructor(nameTask = '', idSmartTask = '', time = '', date = new Date(), id = -1) {
        this.id = id;
        this.nameTask = nameTask;
        this.idSmartTask = idSmartTask;
        this.time = time;
    }
}


export default function CreatorTimerTracker(params) {
    let task = (params.route.params || {TimerTracker: undefined}).time || new TimerTracker()

    const [id, setId] = useState(task.id)
    const [nameTask, setNameTask] = useState(task.nameTask)
    const [idSmartTask, setIdSmartTask] = useState(task.idSmartTask)
    const [time, setTime] = useState(task.time)

    const [errors, setErrors] = useState({})

    function maskTime(x) {
        let n = Number(x.slice(-1))
        console.log(n)
        if (!isNaN(n) && time.length == 0) setTime(x + ':')
        else if(!isNaN(n) && time.length < 4) setTime(x)
        else {
            console.log("invalid input: " + x + " " + typeof x)
        }
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
                <View style={{paddingTop: 20, paddingHorizontal: 10, margin: 20}}>

                </View>
                <CustomInput
                    label={'Затраченное время'}
                    value={time}
                    onChangeText={maskTime}
                    iconName={'time'}
                    placeholder="Ч:MM"/>
                <View style={{paddingTop: 20}}>
                    <CustomButton onPress={() => saveItem(new TimerTracker(nameTask, idSmartTask, time, task.date, id), setId, saveTimerTracker)} text="Сохранить"/>
                    <CustomButton bcolor={'#d41b1b'} onPress={
                        () => deleteItem(id, params.navigation, taskName, timerTrackerApi)
                    } text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}

