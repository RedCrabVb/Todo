import React, {useState} from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export const CustomInput = ({
                   label = '',
                   iconName = 'home',
                   error = undefined,
                   password = false,
                   onFocus = () => {},
                   ...props
               }) => {
    const [hidePassword, setHidePassword] = useState(password)
    const [isFocused, setIsFocused] = useState(false)

    return (<View>
        <Text style={style.label}>{label}</Text>
        <View
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
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
                autoCorrect={false}
                onFocus={() => {
                    onFocus();
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={hidePassword}
                style={{color: '#7978B5', flex: 1}}
                {...props}
            />
            {password && (

                <MaterialCommunityIcons  onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={24} color="black" />
            )}
        </View>
        {error && (
            <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
                {error}
            </Text>
        )}
    </View>
    )
}

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color: 'grey',
    },
    inputContainer: {
        height: 55,
        minWidth: '70%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
});