import React from 'react';
import { StyleSheet, View, Image, Button, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../colors/color'

const LoginScreen  = ({navigation}) => {

        return (
            <View style={styles.loginContainer}>
                <Image style={styles.image} source={require('../assets/img/reading-books.png')} />
                <View style={styles.inputRow}>
                    <Icon name='mail' style={styles.icon} size={16} />
                    <TextInput placeholder='Correo Electrónico'/>
                </View>
                <View style={styles.inputRow}>
                    <FontAwesome name='lock' style={styles.icon} size={16} />
                    <TextInput placeholder='Contraseña' secureTextEntry={true}/>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttons}>
                        <Button title='INICIAR SESION' onPress={() => navigation.navigate('Home')} />
                    </View>
                    <View style={styles.buttons}>
                        <Button title='REGISTRARSE' color={Color.primary} />
                    </View>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({

    loginContainer: {
        alignItems: 'center',
        marginTop: 5
    },

    image: {
        height: 190,
        width: 140
    },

    inputRow: {
        flexDirection: "row",
        marginTop: 10,
        width: 150
    },

    icon: {
        marginRight: 15,
        marginTop: 5
    },

    buttonsContainer: {
        marginTop: 5
    },

    buttons: {
        marginTop: 5,
        width: 250
    }
});

export default LoginScreen