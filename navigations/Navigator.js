import React from 'react';
import { Platform } from 'react-native';
import Color from '../colors/color';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const ROUTES = {
    HOME: 'Home',
}

const BreadNavigator = () => (

    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Color.accent : '',
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Color.accent,
            headerTitleStyle: {
                fontFamily: 'Panton-LightCaps',
                fontSize: 35,
                marginLeft: '38%'
            }
        }}>
            <Stack.Screen name="Login" options={{ title: 'MINERVA' }} component={LoginScreen} />
            <Stack.Screen name={ROUTES.HOME} options={{ title: 'MINERVA' }}component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default BreadNavigator