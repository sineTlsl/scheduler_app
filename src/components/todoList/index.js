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

import {connect} from 'react-redux';
import {getTodo} from '../../store/actions/todo_actions';

import {database} from '../../utils/misc_todo';

class TodoList extends Component {
  // 앱이 렌더링 될 때마다 호출되게 함
  // 이렇게 하면 store가 reducer를 실행시키고 리듀서에서 state 업데이트가 이루어짐
  componentDidMount() {
    this.props.dispatch(getTodo());
  }

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

function mapStateToProps(state) {
  return {
    Todos: state.Todos,
  };
}

export default connect(mapStateToProps)(TodoList);
