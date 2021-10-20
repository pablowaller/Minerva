import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import Color from '../../colors/color'

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
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
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'MINERVA', }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'MINERVA', }} />
  </Stack.Navigator>
);

export default AuthNavigator;