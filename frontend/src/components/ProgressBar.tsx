import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRegister } from '../context/RegisterContext';

const ProgressBar = () => {
    const { progress, isLogin } = useRegister();
    if (!isLogin) return null;

    return (
        <View style={styles.container}>
            {isLogin && <View style={[styles.bar, {width: `${progress}%` }]} /> }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        position: 'absolute',
        top: 70,
    },
    bar: {
        height: 8,
        backgroundColor: 'steelblue',
        borderRadius: 4,
    }
})

export default ProgressBar;