import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native'
import DocumentPicker from 'react-native-document-picker'

class Screen1 extends Component {

    async openDocumentFile(){
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles]
            });

            console.log(
                res.uri,
                res.type,
                res.name,
                res.size
            )
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {

            } else {
                throw err;
            }
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>Sube un documento PDF</Text>
                <TouchableOpacity onPress={() => this.openDocumentFile()} style={{ backgroundColor: '#07cde3' }}>Subir PDF</TouchableOpacity>
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

export default Screen1