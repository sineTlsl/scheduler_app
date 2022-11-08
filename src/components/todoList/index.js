import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from 'react-native';

const {height, width} = Dimensions.get('window');

import Todo from './Todo';

class TodoList extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky3.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.5}}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>TODO LIST</Text>
          <Todo />
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
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    // backgroundColor: '#2B272A',
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
});

export default TodoList;
