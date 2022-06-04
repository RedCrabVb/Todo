import * as React from 'react';
import { ScrollView, Alert } from 'react-native';
import { useEffect, useState } from "react";
import { api } from '../constants/Api';
import { CustomButtonSend, ErrorView } from "../components/CustomElement";
import { getItem } from "../utils/OperationItem";
import { SMART_TASK } from '../constants/Storage';
import { RootTabScreenProps } from '../types';
import { SmartTask } from '../components/class/SmartTask';
import TaskComponent from '../components/TaskComponent';
import { Text, View } from '../components/Themed';


export default function TaskScreen({ navigation }: RootTabScreenProps<'Note'>) {
    const [taskAll, setTaskAll] = useState<Array<SmartTask>>([])
    const [error, setError] = useState({ enable: false, text: '' })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getItem(setTaskAll, setError, api.smartTask, SMART_TASK)
            console.log(JSON.stringify(taskAll))
        })
        return unsubscribe
    })

    function loadNote(smartTask: SmartTask) {
        navigation.navigate('TaskModal', {taskLoad: smartTask})
    }

    return (
        <View>
            <ErrorView text={error.text} enable={error.enable} />
            <CustomButtonSend text="Создать задачу" onPress={() => navigation.navigate('TaskModal', {taskLoad: new SmartTask()})} />
            <ScrollView style={{ padding: '5%' }}>

                {
                    taskAll && taskAll.filter(t => t.completed == false).map(task => <TaskComponent task={task} key={task.id} items={taskAll} setItems={setTaskAll} disabled={false} loadNote={loadNote}/>)
                }
                {
                    taskAll && taskAll.filter(t => t.completed == true).length != 0 &&
                    <View>
                        <Text>Завершенные задачи {taskAll.filter(t => t.completed == true).length}</Text>
                        {taskAll.filter(t => t.completed == true).map(task => <TaskComponent task={task} key={task.id} items={taskAll} setItems={setTaskAll} disabled={false} loadNote={loadNote} />)}
                    </View>
                }
            </ScrollView>
        </View>
    );
}