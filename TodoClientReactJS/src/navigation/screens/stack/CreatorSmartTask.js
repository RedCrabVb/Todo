import * as React from 'react'
import {View, ScrollView, TouchableOpacity, Text} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import {saveSmartTask, smartTask as smartTaskApi} from "../../../utils/Api"
import DateTimePicker from '@react-native-community/datetimepicker'
import {taskName} from "../../../utils/ScreenNames"
import {styles} from '../../../css/css'
import {saveItem} from "../../../utils/SaveItem";
import {deleteItem} from "../../../utils/DeleteItem";
import {CustomInputDate} from "../../../component/CustomInputDate";

class SmartTask {
    constructor(timeBound = new Date().toLocaleDateString("en-US"), specific = '', measurable = '', achievable = '', relevant = '', id = -1) {
        this.id = id;
        this.specific = specific;
        this.measurable = measurable;
        this.achievable = achievable;
        this.relevant = relevant;
        this.timeBound = timeBound;
    }
}

export default function CreatorSmartTask(params) {
    // private String specific; //конкретный
    // private String measurable; //измеримый
    // private String achievable; //достижимый
    // private String relevant; //значемый
    // private String timeBound; //ограничения

    let task = (params.route.params || {task: undefined}).task || new SmartTask()

    const [id, setId] = useState(task.id)
    const [specific, setSpecific] = useState(task.specific)
    const [measurable, setMeasurable] = useState(task.measurable)
    const [achievable, setAchievable] = useState(task.achievable)
    const [relevant, setRelevant] = useState(task.relevant)
    const [timeBound, setTimeBound] = useState(task.timeBound)

    const [errors, setErrors] = useState({})

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
                    placeholder="Ваш текст"/>
                <CustomTextArea
                    label={'M'}
                    value={measurable}
                    onChangeText={setMeasurable}
                    iconName={'lock-closed'}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст"/>
                <CustomTextArea
                    label={'A'}
                    value={achievable}
                    onChangeText={setAchievable}
                    iconName={'lock-closed'}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст"/>
                <CustomTextArea
                    label={'R'}
                    value={relevant}
                    onChangeText={setRelevant}
                    iconName={'lock-closed'}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст"/>
                <CustomInputDate onChange={setTimeBound} value={timeBound}/>

                <View style={{paddingTop: 20}}>
                    <CustomButton onPress={() => {
                        let smtask = new SmartTask(timeBound, specific, measurable, relevant, achievable, id)
                        saveItem(smtask, setId, saveSmartTask)
                    }} text="Сохранить"/>
                    <CustomButton bcolor={'#d41b1b'} onPress={() => deleteItem(id, params.navigation, taskName, smartTaskApi)} text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}

