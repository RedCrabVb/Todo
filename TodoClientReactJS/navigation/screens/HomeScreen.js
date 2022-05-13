import * as React from 'react';
import {Button, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {homeName, logInName} from "../../src/utils/ScreenNames";
import {USER} from "../../src/utils/Storage";
import {version} from '../../src/utils/Api'
import {CustomButton} from "../../src/component/CutomButton";

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
                                    console.log(r)
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
            <CustomButton text="Сбросить данные" onPress={() => {
                console.log("clear data")
                AsyncStorage.clear().then(d => console.log(d));
                navigation.navigate(homeName);
            }}/>
            <Text style={{paddingTop: '50%', textAlign: 'center'}}>Верисия: 2.7.1</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerHome: {
        margin: '2%'
    }
});