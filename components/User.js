import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const User = ({ user, onSelected }) => {
  return (
    <TouchableOpacity onPress={() => onSelected(user)}>
      <View style={styles.user}>
        <View>
          <Text style={styles.title}>{user.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  user: {
    padding: 20,
    margin: 10,
    borderRadius: 3,
    backgroundColor: '#ccc'
  },
  title: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  details: {
    fontSize: 18,
  },
});

export default User;