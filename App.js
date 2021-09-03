import React from 'react';
import BreadNavigator from './navigations/Navigator';
import { useFonts } from 'expo-font'

export default function App() {
  const [loaded] = useFonts({
    'Panton-LightCaps': require('./assets/fonts/Panton-LightCaps.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <BreadNavigator />
  );
};
