import * as React from 'react'
import {View, Text, Vibration} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {styles} from "../../src/css/css"
import {useEffect, useState} from "react"
import {USER} from "../../src/utils/Storage"

export default function TaskScreen({navigation}) {
    const [login, setLogin] = useState("")
    const [mail2, setMail2] = useState("")

    React.useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                AsyncStorage.getItem(USER).then(data => {
                    if (data != null) {
                        const user = (JSON.parse(data))
                        if (user.login != "") {
                            setLogin(user.login);
                            setMail2(user.email);
                        } else {
                            setLogin("Нет данных")
                            setMail2("Нет данных")
                        }
                    } else {
                        setLogin("Нет данных")
                        setMail2("Нет данных")
                    }
                });
                console.log("userEffect TaskScreen")
            });
            return unsubscribe
        }
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textBig}>Логин: {login}</Text>
            <Text style={styles.textBig}>Почта: {mail2}</Text>
            <View style={{paddingBottom: '50%'}}/>
        </View>
    );
}

