import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './../../screens/HomeScreen'
import ChatScreen from './../../screens/ChatScreen'
import BookScreen from './../../screens/BookScreen'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}/>
      <Drawer.Screen name="Chat" component={ChatScreen}/>
      <Drawer.Screen name="Libros" component={BookScreen}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;

