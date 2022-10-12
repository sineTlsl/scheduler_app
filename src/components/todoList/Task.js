import React, {useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconBtn from './IconBtn';
import {icons} from './icons';
import UpdateInput from './UpdateInput';

/* 항목을 감싸줄 컴포넌토 */
const Container = styled.View`
  flex-direction: row;
  height: 52px;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  padding: 5px;
  margin: 5px 0;
`;

/* 할 일 목록을 렌더링할 컴포넌트 */
const Contents = styled.Text`
  flex: 1;
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 16px;
  color: ${({completed}) => (completed ? '#b3aaa4' : '#000000')};
  text-decoration-line: ${({completed}) =>
    completed ? 'line-through' : 'none'};
`;

/*  
    --완료 아이콘 -- 
    item에 있는 completed 값을 확인해서 값이 참이면, 
    check가 렌더링되게 하고 아니면 uncheck 아이콘이 렌더링 되게 한다.
    
    --수정 아이콘--
    item에 있는 completed 값을 확인해서 값이 참이면, 
    edit 아이콘 버튼이 렌더링되지 않고, 아닐 경우에는 edit 아이콘이 렌더링 된다.
*/

const Task = ({item, deleteTask, toggleTask, updateTask}) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태를 관리하는 상태변수
  const [text, setText] = useState(item.text); // 수정되는 텍스트를 관리하는 상태변수.  초기값을 항목의 텍스트로 설정

  /* 항목의 텍스트를 수정한 후에는 edit 값을 false로 변경 */
  const _onSubmit = () => {
    if (isEditing) {
      const updateItem = Object.assign({}, item); // 동일한 항목을 생성
      updateItem['text'] = text; // 텍스트 내용을 변경
      setIsEditing(false);
      updateTask(updateItem);
    }
  };

  /* isEditing 값에 따라 Input 컴포넌트 혹은 기존의 구성이 나타나게 함 */
  return isEditing ? (
    // value 값은 text 상태변수로 설정하고, 사용자가 텍스트를 입력할 때마다 해당 상태변수가 변경되게끔 설정
    <UpdateInput
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={_onSubmit}
      /* text 컴포넌트에서는 입력이 취소되었을 때, text도 항목에 text로 초기화 되고,
               editing도 종료되어야 함 (false) */
      // 텍스트를 입력하다가 포커스를 잃었을 때 원래 항목으로 되돌아가고, 입력창을 false로 변경
      onBlur={() => {
        setText(item.text);
        setIsEditing(false);
      }}
    />
  ) : (
    <Container>
      <IconBtn
        icon={item.completed ? icons.check : icons.uncheck}
        item={item}
        onPress={toggleTask}
      />
      <Contents completed={item.completed}>{item.text}</Contents>
      {
        // edit onPress에 setIsEditing 값을 true로 변경시킴
        item.completed || (
          <IconBtn icon={icons.edit} onPress={() => setIsEditing(true)} />
        )
      }
      <IconBtn icon={icons.delete} item={item} onPress={deleteTask} />
    </Container>
  );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default Task;
