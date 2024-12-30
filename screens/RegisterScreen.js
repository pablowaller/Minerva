import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AuthScreenWrapper from '../components/AuthScreenWrapper';
import { auth } from "../constants/Database"

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [imageURl, setImageURl] = useState('')

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: imageURl ? imageURl : "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png"
                }).then(function () {

                }).catch(function (error) {

                })
                navigation.popToTop()
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    return (
        <AuthScreenWrapper
            title="REGISTRO"
            img={require(('../assets/img/logo.png'))}
            message="¿Ya tienes cuenta?"
            buttonText="Ingresar"
            buttonPath="Login"
            style={styles.registerContainer}
        >
            <Input
                placeholder="Nombre"
                leftIcon={{ type: "material", name: "badge" }}
                value={name}
                onChangeText={text => setName(text)}
                required
            />
            <Input
                placeholder="Correo Electrónico"
                leftIcon={{ type: "material", name: "email" }}
                value={email}
                onChangeText={text => setEmail(text)}
                required
            />
            <Input
                placeholder="Contraseña"
                leftIcon={{ type: "material", name: "lock" }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                required
            />
            <Input
                placeholder="Foto de Perfil"
                leftIcon={{ type: "material", name: "face" }}
                value={imageURl}
                onChangeText={text => setImageURl(text)}
            />
            <Button
                title="REGISTRARME"
                onPress={handleSignUp}
                buttonStyle={styles.button}
            />
        </AuthScreenWrapper>
    );
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#2D93AD'
    }
});

export default RegisterScreen;
