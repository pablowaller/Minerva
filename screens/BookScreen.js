import React from 'react';
import { Image, Text, Button, StyleSheet, View, Alert, Platform } from 'react-native';

let FileViewer, RNFS;
if (Platform.OS !== 'web') {
  FileViewer = require('react-native-file-viewer').default;
  RNFS = require('react-native-fs');
}

const BookScreen = () => {
  const handleOpenPdf = async () => {
    try {
      const url = 'https://example.com/sample.pdf';
      
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        const localFile = `${RNFS.DocumentDirectoryPath}/sample.pdf`;
        const download = RNFS.downloadFile({ fromUrl: url, toFile: localFile });
        await download.promise;
        await FileViewer.open(localFile);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir el archivo PDF');
      console.error(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.welcome}>¡Elegí el libro de tu biblioteca que quieras leer!</Text>
      <Image style={styles.image} source={require('../assets/img/reading-books.png')}/>
      <View>
        <Button 
          onPress={handleOpenPdf}
          title="SUBIR DOCUMENTO PDF..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  welcome: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 30,
    textAlign: 'center'
  },
  image: {
    height: 250,
    width: 200
  }
});

export default BookScreen;