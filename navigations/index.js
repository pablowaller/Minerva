import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import ScreenNavigator from './screens/ScreenNavigator'
import AuthNavigator from './user/AuthNavigator';

const MainNavigator = () => {

  const userId = useSelector(state => state.auth.userId);

  return (
    <NavigationContainer>
      {userId
        ? <ScreenNavigator />
        : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;