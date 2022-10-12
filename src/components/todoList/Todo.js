import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';
import AddTextInput from './AddTextInput';
import Task from './Task';

const ImageBg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  // background-color: grey;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  // background-color: #eeebeb;
`;

const Title = styled.Text`
  font-family: 'ShadowsIntoLight';
  text-shadow-color: #b87d64;
  text-shadow-offset: 4px 4px;
  text-shadow-radius: 8px;
  font-size: 40px;
  color: #8b0000;
  width: 100%;
  align-items: flex-end;
  padding: 10px 25px;
`;

const List = styled.ScrollView`
  flex: 1;
  margin-top: 15px;
  width: ${({width}) => width - 40}px;
`;

const Todo = ({navigation}) => {
  const width = Dimensions.get('window').width;

  /* 편하게 관리할 수 있는 임시 데이터 */
  const conData = {
    1: {id: 1, text: 'Hi', completed: false},
    2: {id: 2, text: 'I am', completed: true},
    3: {id: 3, text: 'Sieun', completed: false},
  };
  const [tasks, setTasks] = useState(conData); // 할 일 목록을 관리하는 상태변수

  const [newTask, setNewTask] = useState(''); // 추가되는 할 일 목록을 내용 저장할 상태 변수

  /* 할 일 --삽입-- 컴포넌트 */
  const addTask = () => {
    // 아무것도 입력하지 않으면 할 일이 추가가 되지 않도록 설정
    if (newTask.length < 1) {
      return;
    }

    const ID = Date.now().toString(); // 아이디가 고유한 값을 가질 수 있도록 햔제 타임스탬프로 지정

    // 새로 생성되는 오브젝트는 키를 방금생성된 아이디로 이용하고
    // 텍스트는 input 컴포넌트에 입력된 텍스트
    // completed는 추가된 내용이니 false로 설정
    const newTaskObject = {
      [ID]: {id: ID, text: newTask, completed: false},
    };
    alert(newTask);
    setNewTask('');
    setTasks({...tasks, ...newTaskObject}); // 기존에 있었던 내용에 추가된 내용 붙이기
  };

  /* 할 일 --삭제-- 컴포넌트 */
  const deleteTask = id => {
    const nowData = Object.assign({}, tasks); // 현재 항목과 동일한 항목을 가지는 변수 생성
    delete nowData[id]; // 변수에서 삭제하고자 하는 ID를 찾아 삭제
    setTasks(nowData); // 가상 변수에서 삭제를 진행한 후 Tasks 항목에 반영
  };

  /* 할 일 --완료-- 컴포넌트 */
  const toggleTask = id => {
    const nowData = Object.assign({}, tasks); // 현재 항목과 동일한 항목을 가지는 변수 생성
    nowData[id]['completed'] = !nowData[id]['completed']; // 현재 값을 반대되는 값으로 변경
    setTasks(nowData); // 가상 변수에서 항목의 순서를 변경한 후 tasks 항목에 반영
  };
  /* 할 일 --수정-- 컴포넌트 */
  const updateTask = item => {
    const nowData = Object.assign({}, tasks); // 현재 항목과 동일한 항목을 가지는 변수 생성
    nowData[item.id] = item; // 현재 목록에서 수정하는 item 전체를 변경
    setTasks(nowData); // 현재 목록을 수정한 후 tasks 항목에 반영
  };

  return (
    <View>
      <AddTextInput
        placeholder="할 일을 이곳에서 추가하세요."
        value={newTask}
        onChangeText={text => setNewTask(text)}
        onSubmitEditing={addTask}
        onBlur={() => setNewTask('')} // input에 입력하던 텍스트 초기화
      />
      <List width={width}>
        {Object.values(tasks)
          .reverse()
          .map(item => (
            <Task
              key={item.id}
              item={item}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              updateTask={updateTask}
            />
          ))}
      </List>
    </View>
  );
};

export default Todo;
