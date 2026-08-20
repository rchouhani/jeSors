import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { InputCompProps } from '../types/components';

const InputComp = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  style,
  labelStyle,
  placeholderStyle,
  keyboardType,
  secureTextEntry,
}: InputCompProps) => {
return (
  <View style={styles.wrapper}>
    {label && <Text style={[styles.labelInput, labelStyle]}>{label}</Text>}
    <View style={[styles.container, style]}>
      <TextInput
          style={placeholderStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
      />
      {icon && icon}
    </View>
  </View>
);
};

const styles = StyleSheet.create({
    wrapper: {
        width: '80%',
        marginVertical: 8,
      },
      container: {
        borderRadius: 8,
        backgroundColor: 'cornflowerblue',
        padding: 10,
      },
      labelInput: {
        color: 'black',
      }
});

export default InputComp;
