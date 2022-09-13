import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNav} from './routes';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
