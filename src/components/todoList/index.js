import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  List,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {connect} from 'react-redux';
import {getTodo} from '../../store/actions/todo_actions';

class TodoList extends Component {
  // 앱이 렌더링 될 때마다 호출되게 함
  // 이렇게 하면 store가 reducer를 실행시키고 리듀서에서 state 업데이트가 이루어짐
  componentDidMount() {
    this.props.dispatch(getTodo());
  }

  renderTodo = Todos =>
    Todos.documents
      ? Todos.documents.map((item, index) => (
          <View style={{width: '100%', alignItems: 'center'}} key={index}>
            <View style={styles.RadiusView}>
              <View>
                {item.data.title ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <Image
                        source={require('../../../assets/icons/uncheck.png')}
                        style={{tintColor: '#d45353', width: 35, height: 35}}
                        // resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.taskText}
                      placeholderTextColor="#777">
                      {item.data.title}
                    </TextInput>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../../assets/icons/edit.png')}
                          style={{tintColor: '#d45353', width: 35, height: 35}}
                          // resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.deleteData()}>
                        <Image
                          source={require('../../../assets/icons/delete.png')}
                          style={{tintColor: '#d45353', width: 35, height: 35}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ))
      : null;

  checkNextID = Todos => {
    if (Todos.documents.length > 0) {
      let numOfArrElements = Todos.documents.length;
      let lastTodoIdx = Number(numOfArrElements) - 1;
      let nextTodoID = Todos.documents[lastTodoIdx].data.id + 1; // 배열의 인덱스를 접근해서 아이디값을 가져오고 + 1을 더함

      return nextTodoID;
    } else {
      return 0;
    }
  };
  addTask = async () => {
    const id = this.checkNextID(this.props.Todos);

    const databaseDirectory = `TodoList/${id}`;
    const databaseRef = database.ref(databaseDirectory);

    try {
      await databaseRef.set({data}); // 데이터 업로드가 완료 되었다면 ...
    } catch (err) {
      alert('저장 실패: ' + err.message);
    }
  };
  render() {
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky3.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.3}}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>TODO LIST</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              autoCapitalize={'none'} // 첫 글자 대소문자 사용 안함
              placeholder="할 일을 이곳에서 추가하세요."
            />
          </View>
          <ScrollView style={{width: '100%'}}>
            <View style={{flexDirection: 'column-reverse'}}>
              {this.renderTodo(this.props.Todos)}
            </View>
          </ScrollView>

          {/* <View style={styles.RadiusView}>
            <TextInput style={{color: 'grey'}} />
          </View> */}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  inputView: {
    marginTop: 10,
    marginBottom: 15,
    width: '85%',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
  },
  inputText: {
    fontFamily: 'IBMPlexSansKR-Regular',
    fontSize: 15,
    height: 40,
    paddingLeft: 10,
    placeholderColor: '#e7A8A8',
  },
  scrollListView: {
    flex: 1,
    marginTop: 15,
    width: '90%',
  },
  RadiusView: {
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    height: 52,
    backgroundColor: '#fff',
    // alignItems: 'center',
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  taskText: {
    fontFamily: 'IBMPlexSansKR-Regular',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  return {
    Todos: state.Todos,
  };
}

export default connect(mapStateToProps)(TodoList);
