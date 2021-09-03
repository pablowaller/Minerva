import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

const HomeScreen = () => {
1
    const [loaded] = useFonts({
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!loaded) {
        return <AppLoading/>
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.welcome}>¡Bienvenido a Minerva, la app para lectores empedernidos!</Text>
            <Image style={styles.image} source={require('../assets/img/owl-waving.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    
    screen: {
        alignItems: 'center'
    },

    welcome: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        textAlign: 'center'
    },

    image: {
        height: 380,
        width: 280
    }

});

export default HomeScreen