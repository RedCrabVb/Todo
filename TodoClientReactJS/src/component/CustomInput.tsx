import React, {useState} from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const CustomInput = ({
                   label = '',
                   iconName = 'home',
                   error = '',
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
            <Icon
                name={iconName}
                style={{color: '#7978B5', fontSize: 22, marginRight: 10}}
            />
            <TextInput
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
                <Icon
                    onPress={() => setHidePassword(!hidePassword)}
                    name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    style={{color: '#7978B5', fontSize: 22}}
                />
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
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 0.5,
    },
});
