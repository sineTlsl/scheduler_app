import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class calendar extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Calendar Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default calendar;
