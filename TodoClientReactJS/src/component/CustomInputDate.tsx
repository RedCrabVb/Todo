import React, {useState, useEffect} from 'react'
import {TextInput, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export const CustomInputDate = ({
                                label = 'Дата',
                                iconName = 'time',
                                error = () => {},
                                type = 'date',
                                onChange = (e: String) => {},
                                value = '',
                                onFocus = () => {},
                                ...props
                            }) => {
    let tmp = new Date(value)
    const [isFocused, setIsFocused] = useState(false)

    const [showDate, setShowDate] = useState(false)
    const [localValue, setLocalValue] = useState(tmp ? tmp : new Date())

    const onChangeL = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate: Date = selectedDate || new Date(value)
        setShowDate(false)

        console.log(currentDate.toLocaleDateString("en-US"))
        onChange(currentDate.toLocaleDateString("en-US"))
        setLocalValue(currentDate)
    }
    return (
        <View >
            <TouchableOpacity activeOpacity={0.5} onPress={() => {console.log("show date"); setShowDate(true)}}>
                <Text style={style.label}>{label}</Text>
                <View>
                    <Icon
                        name={iconName}
                        style={{color: '#7978B5', fontSize: 22, marginRight: 10}}
                    />

                    {showDate && <DateTimePicker
                        value={localValue}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChangeL}
                    />}

                    <TextInput
                        onFocus={() => {
                            onFocus();
                            setIsFocused(true);
                        }}
                        editable={false}
                        onBlur={() => setIsFocused(false)}
                        style={{color: '#7978B5', flex: 1}}
                        value={localValue.toLocaleDateString("en-US")}
                    />
                </View>
                {error && (
                    <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
                        {error}
                    </Text>
                )}
            </TouchableOpacity>

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
