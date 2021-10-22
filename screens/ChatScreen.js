import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ChatScreen extends Component {
    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Sube un documento PDF</Text>
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

export default ChatScreen;