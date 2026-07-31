import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ButtonCompProps } from '../types/components';

const ButtonComp = ({
  title,
  style,
  icon,
  onPress,
  redirectionRoute,
}: ButtonCompProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.7 : 0.9 },
        style,
      ]}
    >
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: 'black',
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
  }
});

export default ButtonComp;