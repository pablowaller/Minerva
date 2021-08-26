import React from 'react';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View } from 'react-native';


export default function App() {

  return (
    <View style={styles.screen}>
      <Header/>
      <StatusBar style="auto" />
      <Login />
      <HomeScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
