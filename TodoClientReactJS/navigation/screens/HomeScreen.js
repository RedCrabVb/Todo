import * as React from 'react';
import {Button, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import {logInName} from "../../src/utils/ScreenNames";
import {USER} from "../../src/utils/Storage";


export default function HomeScreen({navigation}) {
    const [authorized, isAuthorized] = useState(false)
    const [user, setUser] = useState({})
    const [newsLink, setNewsLink] = useState("")


    useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                if (!authorized) {
                    AsyncStorage.getItem(USER).then(data => {
                        if (data == null) {
                            navigation.navigate(logInName)
                        }
                    });
                } else {
                    AsyncStorage.getItem(USER).then(data => {
                        if (data != null || ('token' in data)) {
                            isAuthorized(true)
                            setUser(JSON.parse(data))
                        } else {
                            isAuthorized(false)
                        }
                    });
                }
            });
            return unsubscribe;
        }
    );

    return (
        <View style={styles.containerHome}>
            {
                authorized && user != null && 'qrCode' in user ? (
                    <View>

                        <View style={{margin: '1%', height: '55%'}}>
                        </View>

                        <View style={{paddingTop: '2%', paddingHorizontal: '17%'}}>
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator/>
                )
            }


        </View>
    )
}


const styles = StyleSheet.create({
    containerHome: {
        margin: '2%'
    }
});