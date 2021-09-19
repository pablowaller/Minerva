import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, confirmChat } from '../store/actions/chat.actions';
import ChatUser from '../components/ChatUser';

const ChatScreen = () => {

  const dispatch = useDispatch();
  const users = useSelector(state => state.chat.users);
  const total = useSelector(state => state.chat.total);
  const status = useSelector(state => state.chat.status);

  const handlerDeleteUser = (id) => dispatch(removeUser(id));
  const handlerConfirmChat = () => dispatch(confirmChat(users));

  const renderUser = (data) => (
    <ChatUser user={data.user} onDelete={handlerDeleteUser} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={users}
          keyExtractor={user => user.id}
          renderUser={renderUser}
        />
      </View>
      <View style={styles.footer}>
        {status === 'loading'
         ? (
            <ActivityIndicator
              size="large"
            />
         )
         : (
            <TouchableOpacity style={styles.confirm} onPress={handlerConfirmChat}>
              <Text>Confirmar</Text>
              <View style={styles.total}>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>${total}</Text>
              </View>
            </TouchableOpacity>
         )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff'
  },
  list: {
    flex: 1,
  },
  footer: {
    padding: 12,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  confirm: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    padding: 8,
  },
});

export default ChatScreen;