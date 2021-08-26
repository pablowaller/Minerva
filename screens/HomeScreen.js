import React from 'react';
import { View, Image, Text } from 'react-native'

const HomeScreen = () => {

    return (
        <View>
            <Text>¡Bienvenidos a Minerva! La app para lectores empedernidos!</Text>
            <Image source={require('../assets/logo.png')}/>
        </View>
    )
}

export default HomeScreen