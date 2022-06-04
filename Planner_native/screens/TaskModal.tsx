import * as React from 'react';
import { ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useState, useEffect } from "react";
import { CustomInput, CustomButtonSend, CustomButtonDelete, CustomInputTextArea } from "../components/CustomElement";
import { deleteItem, saveItem } from '../utils/OperationItem';
import { StyleSheet } from "react-native";
import { api } from '../constants/Api';
import { SmartTask } from '../components/class/SmartTask';
import { Text, View } from '../components/Themed';

export default function TaskModal(props: any) {
    console.log({ props })
    let task = props.route.params.taskLoad

    const [id, setId] = useState(task.id)
    const [specific, setSpecific] = useState(task.specific)
    const [measurable, setMeasurable] = useState(task.measurable)
    const [achievable, setAchievable] = useState(task.achievable)
    const [relevant, setRelevant] = useState(task.relevant)
    const [timeBound, setTimeBound] = useState(task.timeBound)

    const [trySaveTask, setTrySaveNote] = useState(false)
    const [errors, setErrors] = React.useState({})

    return (
        <View style={[{ flex: 1 }, styles.container]}>
            <ScrollView>
                <CustomInputTextArea
                    label={'S'}
                    value={specific}
                    onChangeText={setSpecific}
                    placeholder="Ваш текст" />
                <CustomInputTextArea
                    label={'M'}
                    value={measurable}
                    onChangeText={setMeasurable}
                    placeholder="Ваш текст" />
                <CustomInputTextArea
                    label={'A'}
                    value={achievable}
                    onChangeText={setAchievable}
                    placeholder="Ваш текст" />
                <CustomInputTextArea
                    label={'R'}
                    value={relevant}
                    onChangeText={setRelevant}
                    placeholder="Ваш текст" />
                <CustomInputTextArea
                    label={'T'}
                    value={timeBound}
                    onChangeText={setTimeBound}
                    placeholder="Ваш текст" />

                <View style={{ paddingTop: 20 }}>
                    {trySaveTask && <Text>Попытка сохранить задачу</Text>}
                    <CustomButtonSend onPress={() => {
                        if (!trySaveTask) {
                            setTrySaveNote(true)
                            let newTimeBound = new Date(timeBound)
                            let smtask = new SmartTask(newTimeBound, specific, measurable, relevant, achievable, false, id)
                            saveItem(smtask, setId, api.saveSmartTask, () => { setTrySaveNote(false) })
                        }
                    }} text="Сохранить" />
                    <CustomButtonDelete onPress={() => {
                        deleteItem(id, api.smartTask, () => console.log("delete item"))
                    }} text="Удалить" />
                </View>
            </ScrollView>
        </View>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        maxWidth: 600,
        justifyContent: 'center',
    },
    root: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eaeaea',
    },
    editor: {
        flex: 1,
        padding: 0,
        borderColor: 'gray',
        minHeight: 340,
        borderWidth: 1,
        marginHorizontal: 30,
        marginVertical: 5,
        backgroundColor: 'white',
    },
});