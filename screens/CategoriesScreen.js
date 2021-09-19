import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { selectCategory } from '../store/actions/category.actions';
import GridUser from '../components/GridUser';

export default function CategoriesScreen({ navigation }) {

  const dispatch = useDispatch();
  
  const categories = useSelector(state => state.categories.list); 

  const handleSelectedCategory = (user) => {
    dispatch(selectCategory(user.id));
    navigation.navigate('Users', {
      name: user.title,
    });
  }

  const renderGridUser = ({ user }) => (
    <GridUser user={user} onSelected={handleSelectedCategory} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={user => user.id}
        renderUser={renderGridUser}
        numColumns={2}
      />
      <Button
        icon={<Ionicons name="chat" size={24} color="white" />}
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
