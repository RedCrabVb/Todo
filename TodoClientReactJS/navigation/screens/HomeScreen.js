import * as React from 'react';
import {Button, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {logInName} from "../../src/utils/ScreenNames";
import {USER} from "../../src/utils/Storage";
import {version} from '../../src/utils/Api'

export default function HomeScreen({navigation}) {
    const [authorized, isAuthorized] = useState(false)
    const [versionText, setVersion] = useState('')
    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                if (!authorized) {
                    AsyncStorage.getItem(USER).then(data => {
                        if (data == null) {
                            navigation.navigate(logInName)
                        } else {
                            isAuthorized(true)
                            fetch(version)
                                .then(d => d.json())
                                .then(r => {
                                    console.log(r);
                                    setVersion(r)
                                })
                        }
                    });
                }
            });
            return unsubscribe;
        }
    );

    return (
        <View style={styles.containerHome}>
            <Text>Hello, welcome home!</Text>
            <Text>Version: ${versionText}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerHome: {
        margin: '2%'
    }
});