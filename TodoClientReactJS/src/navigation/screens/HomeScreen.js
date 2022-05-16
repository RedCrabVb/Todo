import * as React from 'react'
import {Button, StyleSheet, View, Text, ActivityIndicator} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useEffect, useState} from "react"
import {homeName, logInName} from "../../utils/ScreenNames"
import {USER} from "../../utils/Storage"
import {version} from '../../utils/Api'
import {CustomButton} from "../../component/CutomButton"
import {styles} from "../../css/css"

export default function HomeScreen({navigation}) {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')

    function checkUser() {
        AsyncStorage.getItem(USER).then(data => {
            if (data == null) {
                navigation.navigate(logInName)
            } else {
                isAuthorized(true)
                fetch(version)
                    .then(d => d.json())
                    .then(r => {
                        console.log(r)
                        setVersion(r)
                    })
            }
        });
    }

    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                if (!authorized) {
                    checkUser()
                }
            });
            return unsubscribe;
        }
    );

    return (
        <View style={styles.container}>

            <Text style={{paddingTop: '10%', textAlign: 'center'}}>Верисия API: ${versionText}</Text>
            <View style={{paddingTop: '80%', textAlign: 'center'}}>
            <CustomButton text="Сбросить данные" onPress={() => {
                console.log("clear data")
                AsyncStorage.clear().then(d => console.log(d))
                isAuthorized(false)
                checkUser()
                navigation.navigate(homeName);
            }}/>
            </View>
        </View>
    )
}


