import * as React from 'react'
import {View, ScrollView} from 'react-native'
import {useState} from "react"
import {CustomInput} from "../../../component/CustomInput"
import {CustomButton} from "../../../component/CutomButton"
import {CustomTextArea} from "../../../component/CustomTextArea"
import {saveNote, note as noteApi} from "../../../utils/Api"
import {noteName} from "../../../utils/ScreenNames"
import {styles} from "../../../css/css"
import {deleteItem} from "../../../utils/DeleteItem";
import {saveItem} from "../../../utils/SaveItem";

class Note {
    constructor(head = '', body = '', id = -1) {
        this.id = id;
        this.head = head;
        this.body = body;
    }
}

export default function CreatorNote(params) {
    let note = (params.route.params || {note: undefined}).note || new Note()

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)

    const [errors, setErrors] = React.useState({})

    return (
        <View style={styles.container}>
            <ScrollView>
                <CustomInput
                    label={'Загаловок'}
                    value={head}
                    onChangeText={setHead}
                    iconName={'mail'}
                    error={errors.title}
                    placeholder="Загаловок ..."/>
                <CustomTextArea
                    label={'Текст'}
                    value={body}
                    onChangeText={setBody}
                    iconName={'lock-closed'}
                    error={errors.body}
                    multiline={true}
                    placeholder="Ваш текст ..."/>
                <View style={{paddingTop: '20%'}}>
                    <CustomButton onPress={() => {saveItem(new Note(head, body, id), setId, saveNote)}} text="Сохранить"></CustomButton>
                    <CustomButton bcolor={'#d41b1b'} onPress={() => deleteItem(id, params.navigation, noteName, noteApi)} text="Удалить"/>
                </View>
            </ScrollView>

        </View>
    );
}