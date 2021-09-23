import React from 'react';
import { Platform } from 'react-native';
import Color from '../colors/color';
import { createStackNavigator } from "@react-navigation/stack";
import UserDetailScreen from '../screens/UserDetailScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryUsersScreen from '../screens/CategoryUsersScreen'
import ChatScreen from '../screens/ChatScreen'


const Stack = createStackNavigator();

const ROUTES = {
    HOME: 'Home',
}

const ScreenNavigator = () => (

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
            <Stack.Screen
                name={ROUTES.HOME}
                component={CategoriesScreen}
                options={{
                    title: 'MINERVA',
                }}
            />
            <Stack.Screen
                name="Users"
                component={CategoryUsersScreen}
                options={{
                    title: 'MINERVA',
                }}
            />
            <Stack.Screen
                name="Detail"
                component={UserDetailScreen}
                options={{
                    title: 'MINERVA',
                }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: 'MINERVA',
                }}
            />
        </Stack.Navigator>
);

export default ScreenNavigator
