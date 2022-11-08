import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNav} from './routes';

class App extends Component {
  render() {
    if (process.env.NODE_ENV === 'production') {
      console.log = function no_console() {};
      console.warn = function no_console() {};
    }
    console.warn = function () {};
    return (
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
