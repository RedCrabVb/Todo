import * as React from 'react'
import {View, ScrollView, Text} from 'react-native'
import {useEffect, useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import {note, saveTimerTracker, smartTask as smartTaskApi, timerTracker as timerTrackerApi} from "../../../utils/Api"
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'
import {deleteItem} from "../../../utils/DeleteItem"
import {saveItem} from "../../../utils/SaveItem"
import {CustomInput} from "../../../component/CustomInput"
import DropdownMenu from 'react-native-dropdown-menu'
import {getItem} from "../../../utils/GetItem";

class TimerTracker {
    constructor(nameTask = '', idSmartTask = '', time = '', date = new Date(), id = -1) {
        this.id = id;
        this.nameTask = nameTask;
        this.idSmartTask = idSmartTask;
        this.time = time;
        this.date = date;
    }
}


export default function CreatorTimerTracker(params) {
    let task = (params.route.params || {TimerTracker: undefined}).time || new TimerTracker()

    const [id, setId] = useState(task.id)
    const [nameTask, setNameTask] = useState(task.nameTask)
    const [idSmartTask, setIdSmartTask] = useState(task.idSmartTask)
    const [time, setTime] = useState(task.time)
    const [smartTask, setSmartTask] = useState([[]])
    const [dropDownData, setDropDownData] = useState([[]])
    const [isLoad, setLoad] = useState(false)

    const [errors, setErrors] = useState({})

    function maskTime(x) {//error
        let regx = RegExp('([0-9]:[0-9][0-9])')
        if (regx.test(x)) {
            setTime(x)
        } else {
            console.log("pattern false")
        }
    }

    useEffect(() => {
        if (!isLoad) {
            getItem((arr) => {
                setLoad(true)
                setSmartTask([arr])
                setDropDownData([arr.map(a => a.specific)])
            }, setErrors, smartTaskApi)
        }
    })

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


                <DropdownMenu //error
                    style={{flex: 1}}
                    bgColor={'white'}
                    tintColor={'#666666'}
                    activityTintColor={'green'}
                    handler={(selection, row) => {
                        console.log("change dropdown: " + JSON.stringify(smartTask))
                        setIdSmartTask(smartTask[selection][row].id)
                    }}
                    data={dropDownData}
                >
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
                </DropdownMenu>


            </ScrollView>

        </View>
    );
}

