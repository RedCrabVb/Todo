import * as React from 'react'
import { Button, StyleSheet, View, Text, ActivityIndicator, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"
import { homeName, logInName } from "../../utils/ScreenNames"
import { USER } from "../../utils/Storage"
import { version, api } from '../../utils/Api'
import { CustomButton } from "../../component/CutomButton"
import { styles } from "../../css/css"

export default function HomeScreen({ navigation }) {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')
    const [userInfo, setUserInfo] = useState({})

    function checkUser() {
        AsyncStorage.getItem(USER).then(data => {
            if (data == null) {
                navigation.navigate(logInName)
            } else {



                isAuthorized(true)
                fetch(version)
                    .then(d => d.json())
                    .then(r => {
                        setVersion(r)
                    })

            }
        });
    }

    function botDisable() {
        AsyncStorage.getItem(USER).then(data => {

            console.log(JSON.stringify(userInfo))

            const requestOptions = {
                method: 'POST',
                headers: new Headers(
                    {
                        'Content-Type': 'application/json',
                        'Authorization': data.toString(),
                    }
                ),
            }

            fetch(api.disableTelegram, requestOptions)
                .then(d => d.json())
                .then(r => {
                    console.log(r)
                    setUserInfo(r)
                })
        })
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (!authorized) {
                checkUser()
            } else {
                AsyncStorage.getItem(USER).then(data => {
                    const requestOptions = {
                        method: 'GET',
                        headers: new Headers(
                            {
                                'Content-Type': 'application/json',
                                'Authorization': data.toString()
                            }
                        ),
                    }

                    fetch(api.userInfo, requestOptions)
                        .then(d => d.json())
                        .then(r => {
                            console.log(r)
                            setUserInfo(r)
                        })
                })
            }
        });
        return unsubscribe;
    }
    );

    return (
        <View style={styles.container}>
            {
                userInfo ? <>
                    <Text>Почта: {userInfo.email}</Text>
                    <Text>Логин: {userInfo.username}</Text>
                    {userInfo.secretTokenTg != null && !userInfo.confirmedTg ?
                        <Text>Код для подписки бота: {userInfo.secretTokenTg}</Text>
                        : <></>
                    }

                    <Text>Оповещения в телеграмме {!userInfo.confirmedTg ? <Text>не</Text> : <></>} активированы</Text>

                    {userInfo.confirmedTg ? <CustomButton
                        text="Отписка от бота"
                        onPress={botDisable} style={{ bgColor: "red" }} /> : <></>}
                </> : <></>
            }
            <Text style={{ color: 'blue' }}
                onPress={() => Linking.openURL('https://t.me/note_30_05_bot')}>
                Telegram bot
            </Text>

            <Text style={{ paddingTop: '10%', textAlign: 'center' }}>Верисия API: ${versionText}</Text>
            <View style={{ paddingTop: '80%', textAlign: 'center' }}>
                <CustomButton text="Сбросить данные" bcolor='red' onPress={() => {
                    console.log("clear data")
                    AsyncStorage.clear().then(d => console.log(d))
                    isAuthorized(false)
                    checkUser()
                    navigation.navigate(homeName);
                }} />
            </View>
        </View>
    )
}


