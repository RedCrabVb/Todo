import {TouchableHighlight, View, Alert} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";



import React from 'react'

export const InfoButton = ({text, bcolor = '#8c98ef'}) => {
    const style = {
        height: '5%',
        width: '10%',
        backgroundColor: bcolor,
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center'
    }
    return (
        <TouchableHighlight onPress={()=>{Alert.alert('Info', text)}} style={style}>
            <View>
                <Icon
                    name={'Информация'}
                    style={{color: '#ffffff', fontSize: 22, marginRight: 10}}
                />
            </View>
        </TouchableHighlight>
    );
};
