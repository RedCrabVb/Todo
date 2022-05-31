import * as React from 'react'
import { View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native'
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CryptoJS from "react-native-crypto-js";

class Note {
    constructor(head = '', body = '', encrypted = false, id = -1) {
        this.id = id
        this.head = head
        this.body = body
        this.encrypted = encrypted
    }
}

export default function CreatorNote(params) {


    let note = (params.route.params || { note: undefined }).note || new Note()

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)
    const [encrypted, setEncrypted] = useState(note.encrypted)

    const [passwordNote, setPasswordNote] = useState('')
    const [showEncryptedNote, setShowEncryptedNote] = useState(false)

    const [errors, setErrors] = React.useState({})

    const _editor = React.createRef();

    function encryptedString(str) {
        if (encrypted) {
            let enc = CryptoJS.AES.encrypt(str, passwordNote).toString()

            return enc;
        } else {
            return str;
        }
    }

    function decryptString(str) {
        if (encrypted) {
            let bytesDecrypted = CryptoJS.AES.decrypt(str, passwordNote)
            let decrypted = bytesDecrypted.toString(CryptoJS.enc.Utf8)
    

            return decrypted;
        } else {
            return str;
        }
    }

    function decryptNote() {
        setBody(decryptString(body))
    }

    return (
        <SafeAreaView style={[styles.root, { paddingHorizontal: '5%' }]}>
            {!showEncryptedNote && encrypted ? <><CustomInput
                label={'Пароль для расшифровки'}
                value={passwordNote}
                onChangeText={setPasswordNote}
                iconName={'lock-closed'}
                placeholder="пароль" />
                <CustomButton onPress={() => {
                    setShowEncryptedNote(true)
                    decryptNote()
                }
                } text="Сохранить" />
            </> : <>
                <ScrollView>
                    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
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
                        <Text>Шифровать заметку?</Text>{encrypted ? <Text>Да</Text> : <Text>Нет</Text>}
                        <BouncyCheckbox
                            fillColor='#5e72d9'
                            isChecked={encrypted}
                            onPress={(isChecked) => {
                                setEncrypted(isChecked)
                            }
                            } />
                        <CustomButton onPress={() => {
                            console.log(body)
                            _editor.current?.getHtml()
                                .then(bodyHtml => {
                                    let bodySendHtml = encrypted ? encryptedString(bodyHtml) : bodyHtml
                                    console.log({ bodySendHtml: encryptedString(bodyHtml) }, { encrypted })
                                    console.log(bodySendHtml);
                                    setBody(bodySendHtml)

                                    saveItem(new Note(head, bodySendHtml, encrypted, id), setId, saveNote)
                                })
                        }
                        } text="Сохранить"></CustomButton>
                        <CustomButton bcolor={'#d41b1b'} onPress={() => deleteItem(id, params.navigation, noteName, noteApi)} text="Удалить" />
                    </View>
                </ScrollView>

                <QuillToolbar editor={_editor} options="full" theme="light" />
            </>}



        </SafeAreaView>
    );
}