import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigations'

export default function App() {
  const [loaded] = useFonts({
    'Panton-LightCaps': require('./assets/fonts/Panton-LightCaps.otf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
      <MainNavigator />
  );
}
