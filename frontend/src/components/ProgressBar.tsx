import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRegister } from '../context/RegisterContext';

const ProgressBar = () => {
    const { progress } = useRegister();

    return (
        <View style={styles.container}>
            <View style={[styles.bar, {width: `${progress}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        position: 'relative',
        top: -100,
    },
    bar: {
        height: 8,
        backgroundColor: 'steelblue',
        borderRadius: 4,
    }
})

export default ProgressBar;