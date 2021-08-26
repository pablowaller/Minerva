import React from 'react';
import { StyleSheet, Button, Text, Modal } from "react-native";

const Modalito = props => {

    const { modalVisible, itemSelected, handleConfirmDelete } = props

    return(
        <Modal style={styles.modalContainer} animationType='slide' visible={modalVisible} transparent>
        <Text>Are you sure you want to delete {itemSelected.value}?</Text>
        <Button title='CONFIRM' style={styles.confirm} color='green' onPress={handleConfirmDelete} />
      </Modal>
    );
};


const styles = StyleSheet.create({
  
    modalContainer: {
      padding: 30,
      margin: 'auto',
      marginTop: '1em',
      alignContent: 'center',
    }
  
  });

  export default Modalito;
  