import React from 'react';
import styled from 'styled-components/native';
import {useWindowDimensions} from 'react-native';
import PropTypes from 'prop-types';

const Input = styled.TextInput.attrs(() => ({
  placeholderColor: '#e7A8A8',
}))`
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 15px;
  height: 40px;
  padding-left: 10px;
`;

const Container = styled.View`
  margin-top: 10px;
  width: ${({width}) => width - 60}px;
`;

const AddInput = props => {
  return <Input {...props} maxLength={50} />;
};

const AddTextInput = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  // Dimensions을 이용하여 현재 윈도우의 넓이 값을 가져옴
  // 화면의 크기가 변경될 경우를 위해 useWindowDimensions 사용
  const width = useWindowDimensions().width;
  return (
    <Container
      width={width}
      style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
      }}>
      <AddInput
        placeholder={placeholder}
        autoCapitalize="none" // 대문자 자동 변경 기능 제거
        autoCorrect={false} // 오타 자동 수정 기능 제거
        returnKeyType="done" // 완료 버튼을 return -> done으로 변경되게 수정
        keyboardAppearance="dark" // ios 키보드 색상 dark로 변경
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
      />
    </Container>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string, // 문자열
  value: PropTypes.string.isRequired, // 문자열이며 필수
  onChangeText: PropTypes.func.isRequired, // 함수이며 필수
  onSubmitEditing: PropTypes.func.isRequired, // 함수이며 필수
  onBlur: PropTypes.func, // 함수
};

export default AddTextInput;
