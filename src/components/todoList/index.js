import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class todoList extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>TodoList Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default todoList;
