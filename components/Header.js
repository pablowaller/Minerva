import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'

const Header = () => {

    return (
        <View style={styles.header}>
            <Text style={styles.title}>MINERVA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    header: {
        height: '5em',
        width: '100%',
        backgroundColor: '#4d0099',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 35,
        color: 'white',
    }
});

export default Header