import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Icons } from '@expo/vector-icons';
import { addUser } from '../store/actions/chat.actions';

export default function UserDetailScreen({ navigation }) {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.users.selectedID);
  const users = useSelector(state => state.users.list);
  const user = users.find(user => user.id === userID);

  const handlerAddUserCart = () => {
    dispatch(addUser(user));
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{user.name}</Text>
      </View>
      <Button
        title="Agregar al carrito"
        icon={<Icons name="add" size={24} color="white" />}
        color={COLORS.primary}
        onPress={handlerAddUserCart}
      />
      <Button
        icon={<Icons name="cart" size={24} color="white" />}
        placement="right"
        color={COLORS.primary}
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginBottom: 10,
  },
});