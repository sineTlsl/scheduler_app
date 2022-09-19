import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

class TodoList extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky3.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.5}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>TodoList</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // backgroundColor: '',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    // fontFamily: 'ShadowsIntoLight',
    fontSize: 40,
    color: '#8B0000',
    width: '100%',
    // alignItems: 'flex-end',
    paddingTop: 10,
    paddingLeft: 25,
    textShadowColor: '#B87D64', // 'rgba(0, 0, 0, 0.75)'
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
  },
});

export default TodoList;
