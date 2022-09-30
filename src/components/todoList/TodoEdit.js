/* TodoList 작성을 위한 화면 구성 JS파일 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

class TodoEdit extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky3.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.3}}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>TODO LIST</Text>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleText: {
    fontFamily: 'ShadowsIntoLight',
    fontSize: 40,
    color: '#8B0000',
    width: '100%',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingLeft: 25,
    textShadowColor: '#B87D64', // 'rgba(0, 0, 0, 0.75)'
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default TodoEdit;
