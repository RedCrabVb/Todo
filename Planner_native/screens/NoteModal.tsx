import * as React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Text } from 'react-native';
import { useState, useEffect } from "react";
import { CustomInput, CustomButton } from "../components/CustomElement";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import CryptoJS from "react-native-crypto-js";
import { Note } from '../components/class/Note';
import { deleteItem, saveItem } from '../utils/OperationItem';

export default function NoteModal({noteLoad}: {noteLoad: Note | undefined}) {


    let note = noteLoad || new Note()

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)
    const [encrypted, setEncrypted] = useState(note.encrypted)

    const [passwordNote, setPasswordNote] = useState('')
    const [showEncryptedNote, setShowEncryptedNote] = useState(false)

    const [errors, setErrors] = React.useState({})

    const _editor = React.createRef();

    function encryptedString(str: string) {
        if (encrypted) {
            let enc = CryptoJS.AES.encrypt(str, passwordNote).toString()

            return enc;
        } else {
            return str;
        }
    }

    function decryptString(str: string) {
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
        <SafeAreaView >{/*style={[styles.root, { paddingHorizontal: '5%' }]} */}
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
                            placeholder="Загаловок" />
                    </View>
                    <StatusBar />
                    <QuillEditor
                        // style={styles.editor}
                        // ref={_editor}
                        initialHtml={body}
                    ></QuillEditor>


                    <View style={{ paddingTop: '5%' }}>
                        <Text>Шифровать заметку?</Text>{encrypted ? <Text>Да</Text> : <Text>Нет</Text>}
                        {/* <CheckBox
                            value={encrypted}
                            onValueChange={(isChecked) => {
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
                        <CustomButton bcolor={'#d41b1b'} onPress={() => deleteItem(id, params.navigation, noteName, noteApi)} text="Удалить" /> */}
                    </View>
                </ScrollView>

                {/* <QuillToolbar editor={_editor} options="full" theme="light" /> */}
            </>}



        </SafeAreaView>
    );
}