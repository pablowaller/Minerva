import React from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../colors/color'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            validated: false,
        }
    };

    validate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
            console.log("Email is Correct");
        }
    }

    render() {

        return (
            <View style={styles.loginContainer}>
                <View style={styles.inputRow}>
                    <Icon name='mail' style={styles.icon} size={16} />
                    <TextInput placeholder='Correo Electrónico' onChangeText={(text) => this.validate(text)}
                        value={this.state.email} style={{ borderBottomColor: 'white', borderBottom: 1 }} />
                </View>
                <View style={styles.inputRow}>
                    <FontAwesome name='lock' style={styles.icon} size={16} />
                    <TextInput placeholder='Contraseña' secureTextEntry={true} style={{ borderBottomColor: 'white', borderBottom: 1 }} />
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttons}>
                        <Button title='INICIAR SESION' onClick={this.validate.bind(this)} />
                    </View>
                    <View style={styles.buttons}>
                        <Button title='REGISTRARSE' color={Color.primary} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    loginContainer: {
        marginTop: 5
    },

    inputRow: {
        flexDirection: "row",
        marginTop: 10
    },

    icon: {
        marginRight: 2.5
    },
    
    buttonsContainer: {
        marginTop: 5
    },

    buttons: {
        marginTop: 5
    }
});


export default Login