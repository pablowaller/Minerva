import React, { useCallback, useReducer } from 'react';
import { Alert, StyleSheet, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import Input from '../components/Input';
import { login } from '../store/actions/auth.action';
import AuthScreenWrapper from '../components/AuthScreenWrapper';
import { formReducer, FORM_INPUT_UPDATE } from './formReducer';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {

  const dispatch = useDispatch();
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const handleLogin = () => {
    if (formState.formIsValid) {
      dispatch(login(formState.inputValues.email, formState.inputValues.password));
    } else {
      Alert.alert(
        'Formulario inválido',
        'Ingresa email y usuario válido',
        [{ text: 'Ok' }]
      );
    }
  }

  const onInputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    formDispatch({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier,
    });
  }, [formDispatch]);


  return (
      <AuthScreenWrapper
        title="INICIAR SESIÓN"
        img = {require(('../assets/img/owl-waving.png'))}
        message="¿Aún no tienes cuenta?"
        buttonText="Ir al registro"
        buttonPath="Register"
      >
        <View style={styles.inputRow}>
          <Icon name='mail' style={styles.icon} size={16} />
          <Input
            id="email"
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            errorText="Por favor ingrese un email válido"
            required
            email
            onInputChange={onInputChangeHandler}
          />
        </View>
        <View style={styles.inputRow}>
          <FontAwesome name='lock' style={styles.icon} size={16} />
          <Input
            id="password"
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            errorText="Ingrese contraseña"
            required
            onInputChange={onInputChangeHandler}
          />
        </View>
        <Button
          title="INICIAR SESIÓN"
          onPress={handleLogin}
          buttonStyle={styles.buttons}
        />
      </AuthScreenWrapper>
  );
}

const styles = StyleSheet.create({

  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputRow: {
    flexDirection: "row",
  },

  buttons: {
    marginVertical: 20,
    backgroundColor: '#2D93AD'
  }
});

export default LoginScreen;