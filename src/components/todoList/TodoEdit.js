/* TodoList 작성을 위한 화면 구성 JS파일 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class TodoEdit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>TodoList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoEdit;
