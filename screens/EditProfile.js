import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import ImageSelector from '../components/ImageSelector';

const NewPlaceScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState();


    const handleSave = () => {
        dispatch(image);
        navigation.navigate('Direcciones');
    }

    const handlePickImage = (uri) => {
        setImage(uri);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Editar Perfil</Text>
                <ImageSelector onImage={handlePickImage} />
                <Button
                    title="Subir foto"
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
})

export default NewPlaceScreen