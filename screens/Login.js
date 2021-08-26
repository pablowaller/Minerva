import React from 'react';
import { View, Button, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../colors/color'

export default class Login extends React.Component {

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
            <View>
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <Icon name='mail' style={{ marginRight: '2%' }} size={16} />
                    <TextInput placeholder='Correo Electrónico' onChangeText={(text) => this.validate(text)}
                        value={this.state.email} style={{ borderBottomColor: 'white', borderBottom: 1 }} />
                </View>
                <View style={{ flexDirection: "row", marginTop: 12.5 }}>
                    <FontAwesome name='lock' style={{ marginRight: '2%' }} size={16} />
                    <TextInput placeholder='Contraseña' secureTextEntry={true} style={{ borderBottomColor: 'white', borderBottom: 1 }} />
                </View>
                <View style={{ marginTop: 12.5, marginBottom: 5, paddingHorizontal: 10 }}>
                    <Button title='INICIAR SESION' onClick={this.validate.bind(this)} />
                </View>
                <View style={{ marginTop: 5 }}>
                    <Button title='REGISTRARSE' color={Color.primary} />
                </View>
            </View>
        )
    }
}