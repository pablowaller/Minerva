import React, { useEffect } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import User from '../components/User';
import { selectUser, filterUsers } from '../store/actions/user.actions';

export default function CategoryUsersScreen({ navigation }) {
  const dispatch = useDispatch();
  const categoryID = useSelector(state => state.categories.selectedID);
  const users = useSelector(state => state.users.filteredUsers);

  useEffect(() => {

    setTimeout(() => dispatch(filterUsers(categoryID)), 1000);

    return () => {
      dispatch(filterUsers());
    }
  }, [categoryID]);

  const handleSelected = (user) => {
    dispatch(selectUser(user.id));
    navigation.navigate('Detail', {
      name: user.name,
    });
  }

  const renderUser = ({ user }) => (
    <User user={user} onSelected={handleSelected} />
  )

  return (
    <View style={styles.container}>
      {users.length
        ? (
          <FlatList
            data={users}
            keyExtractor={user => user.id}
            renderUser={renderUser}
          />
        )
        : <ActivityIndicator size="large" />}
      <Button
        icon={<Ionicons name="cart" size={24} color="white" />}
        placement="right"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});