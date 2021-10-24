import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import AuthScreenWrapper from '../components/AuthScreenWrapper';
import {auth} from "../constants/database"

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error)
      })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged
      (function (user) {
        if (user) {
          navigation.replace('Home')
        } else {
          navigation.canGoBack('Home') && navigation.popToTop()
        }
      });
    return () => {
      unsubscribe
    }
  }, [])

  return (
    <AuthScreenWrapper
      title="INICIAR SESIÓN"
      img={require(('../assets/img/owl-waving.png'))}
      message="¿Aún no tienes cuenta?"
      buttonText="Ir al registro"
      buttonPath="Register"
    >
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
      <Button
        title="INICIAR SESIÓN"
        onPress={handleLogin}
        buttonStyle={styles.button}
      />
    </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({

  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    width: 200,
    backgroundColor: '#2D93AD'
  }
});

export default LoginScreen;
