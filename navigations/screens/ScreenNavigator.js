import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'
import HomeScreen from './../../screens/HomeScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatScreen from './../../screens/ChatScreen'
import BookScreen from './../../screens/BookScreen'
import NewPlaceScreen from './../../screens/EditProfile'

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={{backgroundColor: "#5b07a6"}}></View>
  )
}

const ScreenNavigator = () => (
  <Drawer.Navigator drawerStyle={{color: "#5b07a6"}}>
    <Drawer.Screen name="Home" component={HomeScreen} backgroundColor="#5b07a6" />
    <Drawer.Screen name="Chat" component={ChatScreen} backgroundColor="#5b07a6" />
    <Drawer.Screen name="Libros" component={BookScreen} backgroundColor="#5b07a6" />
    <Drawer.Screen name="Mi cuenta" component={NewPlaceScreen} />
  </Drawer.Navigator>
)

export default ScreenNavigator;

