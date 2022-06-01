import { TouchableHighlight, View, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";



import React from 'react'

export const InfoButton = ({ text = '', bcolor = '#8c98ef' }) => {
    const style = StyleSheet.create({
        container: {
            height: '5%',
            width: '10%',
            backgroundColor: bcolor,
            borderRadius: 50,
            alignContent: 'center',
            alignItems: 'center'
        }
    })
    return (
        <TouchableHighlight onPress={() => { Alert.alert('Информация', text) }} style={style.container}>
            <View>
                <Icon
                    name={'information'}
                    style={{ color: '#ffffff', fontSize: 22, marginRight: 10 }}
                />
            </View>
        </TouchableHighlight>
    );
};

