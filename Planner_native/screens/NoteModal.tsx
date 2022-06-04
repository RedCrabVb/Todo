import * as React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Text, ActivityIndicator } from 'react-native';
import { useState, useEffect } from "react";
import { CustomInput, CustomButtonSend, CustomButtonDelete } from "../components/CustomElement";
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import CryptoJS from "react-native-crypto-js";
import { Note } from '../components/class/Note';
import { deleteItem, saveItem } from '../utils/OperationItem';
import Checkbox from 'expo-checkbox';
import { StyleSheet } from "react-native";
import { api } from '../constants/Api';

export default function NoteModal(props: any) {
    console.log({ props })
    let note = props.route.params.noteLoad

    const [id, setId] = useState(note.id)
    const [head, setHead] = useState(note.head)
    const [body, setBody] = useState(note.body)
    const [pined, setPined] = useState(note.pined)
    const [encrypted, setEncrypted] = useState<boolean>(note.encrypted)

    const [passwordNote, setPasswordNote] = useState('')
    const [showEncryptedNote, setShowEncryptedNote] = useState(false)

    const [trySaveNote, setTrySaveNote] = useState(false)
    const [errors, setErrors] = React.useState({})

    const _editor = React.createRef<QuillEditor>();

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
        <SafeAreaView style={[styles.root, { paddingHorizontal: '5%' }]}>
            {!showEncryptedNote && encrypted ? <><CustomInput
                label={'Пароль для расшифровки'}
                value={passwordNote}
                onChangeText={setPasswordNote}
                iconName={'lock'}
                placeholder="пароль" />
                <CustomButtonSend onPress={() => {
                    setShowEncryptedNote(true)
                    decryptNote()
                }} text="Сохранить" />
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
                        style={styles.editor}
                        ref={_editor}
                        initialHtml={body}
                    ></QuillEditor>


                    <View style={{ paddingTop: '5%' }}>
                        <Text>Шифровать заметку?</Text>{encrypted ? <Text>Да</Text> : <Text>Нет</Text>}
                        <Checkbox
                            value={encrypted}
                            onValueChange={(isChecked) => {
                                setEncrypted(isChecked)
                            }
                            } />
                        {trySaveNote && <ActivityIndicator size="large" color="#ce1c1c" />}
                        <CustomButtonSend onPress={() => {
                            console.log(body)
                            _editor.current?.getHtml()
                                .then(bodyHtml => {
                                    if (!trySaveNote) {
                                        let bodySendHtml = encrypted ? encryptedString(bodyHtml) : bodyHtml
                                        console.log({ bodySendHtml: encryptedString(bodyHtml) }, { encrypted })
                                        setTrySaveNote(true)

                                        saveItem(new Note(head, bodySendHtml, pined, encrypted, new Date(), id), setId, api.saveNote, () => { setTrySaveNote(false) })
                                    }
                                })
                        }
                        } text="Сохранить"></CustomButtonSend>
                        <CustomButtonDelete onPress={() => deleteItem(id, api.note, () => props.navigation.navigate('Note'))} text="Удалить" />
                    </View>
                </ScrollView>

                <QuillToolbar editor={_editor} options="full" theme="light" />
            </>}



        </SafeAreaView>
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