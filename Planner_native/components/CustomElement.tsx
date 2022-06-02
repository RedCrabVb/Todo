import React, { useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from './Themed';

export const CustomInput = ({
    label = 'f',
    iconName = 'home',
    error = undefined,
    password = false,
    onFocus = () => { },
    ...props
}): JSX.Element => {
    const [hidePassword, setHidePassword] = useState(password)
    const [isFocused, setIsFocused] = useState(false)

    return (<View>
        <Text lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            style={style.label}>{label}</Text>
        <View
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            style={[
                style.inputContainer,
                {
                    borderColor: error
                        ? 'red'
                        : isFocused
                            ? '#7978B5'
                            : 'white',
                    alignItems: 'center',
                },
            ]}>

            <MaterialCommunityIcons name={iconName} size={24} color="black" />
            <TextInput
                autoCorrect={false}
                onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={hidePassword}
                style={{ color: '#7978B5', flex: 1 }}
                {...props}
            />
            {password && (

                <MaterialCommunityIcons onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="black" />
            )}
        </View>
        {error && (
            <Text style={{ marginTop: 7, color: 'red', fontSize: 12 }}>
                {error}
            </Text>
        )}
    </View>
    )
}

export const CustomButton = ({ onPress = (v: any) => { }, text = '', bcolor = '#3949aredb', disabled = false }): JSX.Element => {

    return (
        <TouchableOpacity
            activeOpacity={0.5} disabled={disabled}
            onPress={onPress}
        >
            <View
                lightColor="rgba(70, 189, 255, 0.8)"
                darkColor="rgba(15, 86, 124,0.8)"
                style={disabled ? style.containerDisabled : [style.container]}
            >
                <Text style={style.text}>
                    {text}
                </Text>

            </View>

        </TouchableOpacity>
    )
}

export const ErrorView = ({ text = '', enable = false }): JSX.Element => {
    return (enable ?
        <View
            lightColor="red"
            darkColor="red"
            style={style.container}>
            <Text>Error: {text}</Text>
        </View>
        : <></>
    )
}


const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
    },
    inputContainer: {
        height: 55,
        minWidth: '70%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
    container: {
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5
    },
    containerDisabled: {
        width: '100%',

        padding: 15,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5
    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    }
});