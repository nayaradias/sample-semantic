/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

export default function App() {
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <StatusBar barStyle="dark-content" />
      <Text>Semantic release</Text>
    </SafeAreaView>
  );
}
