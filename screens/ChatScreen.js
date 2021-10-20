import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Screen2 extends Component {
    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Sube un documento PDF</Text>
                <Button>Subir PDF</Button>
            </View>
        )
    }
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

export default Screen2;