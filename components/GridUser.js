import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const GridUser = ({ user, onSelected }) => {
  return (
    <View style={styles.gridUser}>
      <TouchableOpacity
        style={{ ...styles.container }}
        onPress={() => onSelected(user)}
      >
        <View>
          <Text style={styles.title}>{user.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gridUser: {
    flex: 1,
    borderRadius: 6,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 6,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 8,
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'right'
  }
});

export default GridUser;