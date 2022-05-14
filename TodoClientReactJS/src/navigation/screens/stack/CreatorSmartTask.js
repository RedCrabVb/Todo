import * as React from 'react'
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native'
import {useState} from "react"
import {CustomButton} from "../../../component/CutomButton";
import {CustomTextArea} from "../../../component/CustomTextArea";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {USER} from "../../../utils/Storage";
import {addNote, addSmartTask, allNote, deleteTask as deleteTaskApi} from "../../../utils/Api";
import DatePicker from 'react-native-datepicker';
import {StyleSheet} from "react-native";

export default function CreatorSmartTask(params) {
    // private String specific; //конкретный
    // private String measurable; //измеримый
    // private String achievable; //достижимый
    // private String relevant; //значемый
    // private String timeBound; //ограничения

    const task = (params.route.params || {task: undefined}).task || {
        id: -1,
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timeBound: '09-10-2021'
    }

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
            <View style={{paddingTop: 20, paddingHorizontal: 10, margin: 20}}>
                <DatePicker
                    date={timeBound}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2016-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {
                        setTimeBound(date)
                    }}
                />

            </View>
            <View style={{paddingTop: 20, justifyContent: 'flex-end'}}>
                <CustomButton onPress={handlerSend} text="Сохранить"></CustomButton>
                <CustomButton onPress={deleteTask} text="Удалить"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A8E9CA'
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePickerStyle: {
        width: 230,
    },
    text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color: "#000"
    }
});