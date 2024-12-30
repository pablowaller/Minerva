import React, { Component } from 'react';
import { Image, Text, Button, StyleSheet, View } from 'react-native';
import * as OpenAnything from 'react-native-openanything'

const BookScreen  = () => {

	return(
        <View style={styles.screen}>
        <Text style={styles.welcome}>¡Elegí el libro de tu biblioteca que quieras leer!</Text>
		<Image style={styles.image} source={require('../assets/img/reading-books.png')}/>
		<View>
        <Button onPress={() => OpenAnything.Pdf('tutorialspoint.com/react_native/react_native_tutorial.pdf')}
        title="SUBIR DOCUMENTO PDF..."/>
		 </View>
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
        height: 250,
        width: 200
    }

});

export default BookScreen