import React from 'react';
import HomeScreen from './../../screens/HomeScreen'
import { StackActions, NavigationActions } from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChatScreen from './../../screens/ChatScreen'
import BookScreen from './../../screens/BookScreen'
import Color from '../../colors/color'
import {auth} from '../../constants/database';

const Drawer = createDrawerNavigator();

const ScreenNavigator = ({navigation}) => {

  const signOut = () => {
    auth.signOut().then(() => {
      const resetAction = StackActions.reset({ 
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: notResetRoute.routes[0].routeName }),
        ],
      });
      navigation.dispatch(resetAction);
    }).catch((error) => {
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({

      headerRight: () => (
        <TouchableOpacity style={{
          marginRight: 30
        }}
          onPress={signOut}
        >
          <MaterialIcons name="logout" size={24}
            color="black" />
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <Drawer.Navigator initialRouteName="Drawer Screens"
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
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'MINERVA' }} />
      <Drawer.Screen name="Chat" component={ChatScreen} options={{ title: 'MINERVA' }} />
      <Drawer.Screen name="Libros" component={BookScreen} options={{ title: 'MINERVA' }} />
    </Drawer.Navigator>
  )
}

export default ScreenNavigator;

