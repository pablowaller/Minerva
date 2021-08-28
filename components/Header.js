import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font'

const Header = () => {

    const [loaded] = useFonts({
        PantonLightCaps: require('../assets/fonts/OfficialBook.ttf'),
    });

    if (!loaded) {
        return null;
    }

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
        height: 5,
        width: '100%',
        backgroundColor: '#4d0099',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 20,
        color: 'white',
    }
});

export default Header