import React, {useState} from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'

export const CustomTextArea = ({
                                label,
                                error,
                                onChangeTextEvent,
                                multiline = false,
                                onFocus = () => {},
                                ...props
                            }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [text, setText] = useState({text: '', height: 0})
    return (
        <View style={[{height: Math.max(60, text.height + 10)}]}>
            <Text style={[style.label]}>{label}</Text>
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
                    {height: Math.max(60, text.height + 10)}
                ]}>
                <TextInput
                    autoCorrect={false}
                    onFocus={() => {
                        onFocus();
                        setIsFocused(true);
                    }}
                    multiline={multiline}
                    onBlur={() => setIsFocused(false)}
                    onContentSizeChange={(event) => {
                        setText({text: '', height: event.nativeEvent.contentSize.height })
                    }}
                    style={[{color: '#7978B5', flex: 1}, {height: Math.max(30, text.height)}]}
                    onChange={onChangeTextEvent}
                    {...props}
                />
            </View>
            {error && (
                <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
                    {error}
                </Text>
            )}
        </View>
    );
};

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
