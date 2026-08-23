import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { InputCompProps } from '../types/components';

const InputComp = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  style,
  labelStyle,
  keyboardType,
  secureTextEntry,
}: InputCompProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
  <View style={styles.wrapper}>
    {label && <Text style={[styles.labelInput, labelStyle]}>{label}</Text>}
    <View style={[styles.container, style]}>
      <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isVisible}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text>{isVisible ? '👁️' : '😣'}</Text>
        </TouchableOpacity>
      )}
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
        flexDirection: 'row',
        alignItems: 'center',
      },
      labelInput: {
        color: 'black',
      },
      input: {
        flex: 1,
        color: 'black',
      }
});

export default InputComp;
