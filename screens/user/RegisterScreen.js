import React, { useCallback, useReducer } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import AuthScreenWrapper from '../../components/AuthScreenWrapper';
import { signup } from '../../store/actions/auth.action';
import Input from '../../components/Input';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const inputValues = {
            ...state.inputValues,
            [action.input]: action.value,
        }
        const inputValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        }
        let formIsValid = true;

        for (const key in inputValidities) {
            formIsValid = formIsValid && inputValidities[key];
        }

        return {
            formIsValid,
            inputValues,
            inputValidities,
        }
    }

    return state;
};

const RegisterScreen = () => {
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

    const handleSignUp = () => {
        if (formState.formIsValid) {
            dispatch(signup(formState.inputValues.email, formState.inputValues.password));
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
            title="REGISTRO"
            message="¿Ya tienes cuenta?"
            buttonText="Ingresar"
            buttonPath="Login"
            style={styles.registerContainer}
        >
            <View style={styles.inputRow}>
                <Icon name='mail' style={styles.icon} size={16} />
                <Input
                    id="email"
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errorText="Por favor ingresa un email válido"
                    required
                    email
                    onInputChange={onInputChangeHandler}
                />
            </View>
            <View style={styles.inputRow}>
                <FontAwesome name='lock' style={styles.icon} size={16} />
                <Input
                    id="password"
                    label="Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    errorText="La contraseña debe ser mínimo 6 carácteres"
                    required
                    minLength={6}
                    onInputChange={onInputChangeHandler}
                />
            </View>
            <Button
                title="REGISTRARME"
                onPress={handleSignUp}
                buttonStyle={styles.button}
            />
        </AuthScreenWrapper>
    );
}

const styles = StyleSheet.create({

    registerContainer: {
        alignItems: 'center',
        marginTop: 5
    },

    button: {
        width: 250,
        marginVertical: 20,
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
});

export default RegisterScreen;