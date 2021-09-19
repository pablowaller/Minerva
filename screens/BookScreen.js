import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading';

const BookScreen = () => {
1
    const [loaded] = useFonts({
        'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!loaded) {
        return <AppLoading/>
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Sube un documento PDF</Text>
            <Button>Subir PDF</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    
    screen: {
        alignItems: 'center'
    },

    text: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 30,
        textAlign: 'center'
    },

});

export default BookScreen