import * as React from 'react'
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { useState, useEffect } from "react"
import { CustomInput } from "../../../component/CustomInput"
import { CustomButton } from "../../../component/CutomButton"
import { CustomTextArea } from "../../../component/CustomTextArea"
import { saveNote, note as noteApi } from "../../../utils/Api"
import { noteName } from "../../../utils/ScreenNames"
import { styles } from "../../../css/css"
import { deleteItem } from "../../../utils/DeleteItem";
import { saveItem } from "../../../utils/SaveItem";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

class Note {
    constructor(head = '', body = '', id = -1) {
        this.id = id;
        this.head = head;
        this.body = body;
    }
}

export default function CreatorNote(params) {


    let note = (params.route.params || { note: undefined }).note || new Note()

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)

    const [errors, setErrors] = React.useState({})

    const _editor = React.createRef();

    return (
        <SafeAreaView style={styles.root}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    <CustomInput
                        label={'Загаловок'}
                        value={head}
                        onChangeText={setHead}
                        iconName={'mail'}
                        error={errors.title}
                        placeholder="Загаловок" />
                </View>
                <StatusBar style="auto" />
                <QuillEditor
                    style={styles.editor}
                    ref={_editor}
                    initialHtml={body}
                ></QuillEditor>


                <View style={{ paddingTop: '5%' }}>
                    <CustomButton onPress={() => {
                        console.log(body)
                        _editor.current?.getHtml()
                            .then(bodyHtml => {
                                console.log(bodyHtml);
                                setBody(bodyHtml)
                                saveItem(new Note(head, bodyHtml, id), setId, saveNote)
                            })
                    }
                    } text="Сохранить"></CustomButton>
                    <CustomButton bcolor={'#d41b1b'} onPress={() => deleteItem(id, params.navigation, noteName, noteApi)} text="Удалить" />
                </View>
            </ScrollView>

            <QuillToolbar editor={_editor} options="full" theme="light" />


        </SafeAreaView>
    );
}