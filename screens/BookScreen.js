import React, { Component } from 'react';
import { Image, Text, Button, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import PSPDFKitView from 'react-native-pspdfkit';

export default class BookScreen extends Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			document: null,
		};
	}

	render() {
		return (
			<View style={styles.screen}>
		<Text style={styles.welcome}>¡Elegí el libro de tu biblioteca que quieras leer!</Text>
		<Image style={styles.image} source={require('../assets/img/reading-books.png')}/>
				{this.state.document == null ? (
					<View style={styles.container}>
						<Button
							onPress={async () => {
								try {
									const file = await DocumentPicker.pick({
										type: [DocumentPicker.types.pdf],
										copyTo: 'documentDirectory',
									});
									this.setState({
										document: decodeURI(
											file.fileCopyUri.replace('file://', ''),
										),
									});
								} catch (error) {
									if (DocumentPicker.isCancel(error)) {
									} else {
										throw error;
									}
								}
							}}
							title="SUBIR DOCUMENTO PDF..."
						/>
					</View>
				) : (
					<PSPDFKitView
						ref="pdfView"
						document={this.state.document}
						showNavigationButtonInToolbar={true}
						showCloseButton={true}
						configuration={{
							showThumbnailBar: 'scrollable',
						}}
						onNavigationButtonClicked={(event) => {
							this.setState({ document: null });
						}}
						onCloseButtonPressed={(event) => {
							this.setState({ document: null });
						}}
						style={{ flex: 1 }}
					/>
				)}
				</View>
		);
	}
}

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
