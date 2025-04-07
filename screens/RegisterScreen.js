import React, { useState } from 'react';
import { StyleSheet, Alert, View, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import AuthScreenWrapper from '../components/AuthScreenWrapper';
import { auth } from "../constants/Database";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImageUri(null);
    };

    const uploadImage = async (uri) => {
        const storage = getStorage();
        const response = await fetch(uri);
        const blob = await response.blob();
        
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, blob);
        
        return await getDownloadURL(storageRef);
    };

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
            return;
        }
    
        setLoading(true);
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            let photoURL = "https://default-profile-url.com/default.jpg";
            
            if (imageUri) {
                const profilePicRef = ref(storage, `profilePics/${userCredential.user.uid}`);
                const response = await fetch(imageUri);
                const blob = await response.blob();
                await uploadBytes(profilePicRef, blob);
                photoURL = await getDownloadURL(profilePicRef);
            }
    
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL
            });
    
            navigation.popToTop();
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Este correo electrónico ya está registrado";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Correo electrónico no válido";
                    break;
                case 'auth/weak-password':
                    errorMessage = "La contraseña debe tener al menos 6 caracteres";
                    break;
                default:
                    errorMessage = error.message;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthScreenWrapper
            title="REGISTRO"
            img={require('../assets/img/logo.png')}
            message="¿Ya tienes cuenta?"
            buttonText="Ingresar"
            buttonPath="Login"
        >
            <Input
                placeholder="Nombre*"
                leftIcon={{ type: "material", name: "badge" }}
                value={name}
                onChangeText={text => setName(text)}
                autoCapitalize="words"
            />
            <Input
                placeholder="Correo Electrónico*"
                leftIcon={{ type: "material", name: "email" }}
                value={email}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Input
                placeholder="Contraseña*"
                leftIcon={{ type: "material", name: "lock" }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                        <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
                            <Icon name="close" type="material" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Button
                        title="Seleccionar Foto de Perfil"
                        onPress={pickImage}
                        buttonStyle={styles.imageButton}
                        icon={
                            <Icon
                                name="camera-alt"
                                type="material"
                                color="#fff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                    />
                )}
            </View>
            
            <Button
                title={loading ? "REGISTRANDO..." : "REGISTRARME"}
                onPress={handleSignUp}
                buttonStyle={styles.button}
                disabled={loading}
            />
        </AuthScreenWrapper>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2D93AD',
        marginTop: 10
    },
    imageContainer: {
        marginBottom: 20,
        alignItems: 'center'
    },
    imageButton: {
        backgroundColor: '#2D93AD',
        width: '100%'
    },
    previewContainer: {
        position: 'relative',
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        marginVertical: 10
    },
    imagePreview: {
        width: '100%',
        height: '100%'
    },
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RegisterScreen;