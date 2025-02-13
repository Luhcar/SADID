import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Label = ({text, required}) => {
  return (
    <Text style={styles.text}>
      {text}
      {required ? <Text style={{color: 'red'}}>*</Text> : ''}
    </Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },
});
