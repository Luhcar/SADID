import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Label from './Label'

const input = ({
    label,
    placeholder,
    required,
    keyboardType,
    secure,
    onChange,
    value
}) => {
  return (
    <View>
      <Label text={label} required={required} />
      <TextInput 
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor='#8D92A3'
      keyboardType={keyboardType}
      secureTextEntry={secure}
      onChangeText={onChange}
      value={value}
      />
    </View>
  )
}

export default input

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        width: 312,
        height: 45,
        borderColor: 'black',
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
        color: 'black',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
      },
})