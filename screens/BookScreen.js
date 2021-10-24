import React, { Component } from 'react';
import { AppRegistry, Button, StyleSheet, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PSPDFKitView from 'react-native-pspdfkit';

export default class BookScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			document: null,
		};
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

AppRegistry.registerComponent(
	'DocumentBrowserExample',
	() => DocumentBrowserExample,
);