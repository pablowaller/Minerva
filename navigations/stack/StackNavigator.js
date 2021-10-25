import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../drawer/DrawerNavigator'
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import Color from '../../colors/color'

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.accent : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Color.accent,
      headerTitleStyle: {
        fontFamily: 'Panton-LightCaps',
        fontSize: 35,
        marginLeft: '38%'
      }
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'MINERVA', headerTitleAlign: 'center' }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'MINERVA', headerTitleAlign: 'center' }} />
    <Stack.Screen name="Screens" component={DrawerNavigator} options={{ title: 'MINERVA', headerTitleAlign: 'center' }} />
  </Stack.Navigator>
);

export default StackNavigator;