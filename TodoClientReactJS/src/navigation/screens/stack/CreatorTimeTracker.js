import * as React from 'react'
import {View, ScrollView} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import {saveTimerTracker, timerTracker as timerTrackerApi} from "../../../utils/Api"
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'
import DatePicker from "react-native-datepicker";
import {deleteItem} from "../../../utils/DeleteItem";

class TimerTracker {
    constructor(nameTask = '', idSmartTask = '', time = new Date(), id = -1) {
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
                    <CustomButton onPress={() => saveItem(new TimerTracker(nameTask, idSmartTask, time, id), setId, saveTimerTracker)} text="Сохранить"/>
                    <CustomButton bcolor={'#d41b1b'} onPress={
                        () => deleteItem(id, params.navigation, taskName, timerTrackerApi)
                    } text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}

