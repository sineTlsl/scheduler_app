import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Input = styled.TextInput.attrs(() => ({
  placeholderColor: '#e7A8A8',
}))`
  font-family: 'IBMPlexSansKR-Regular';
  font-size: 16px;
  height: 40px;
  padding-left: 10px;
`;

const Container = styled.View`
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  height: 52px;
  padding: 5px;
  margin: 5px 0;
`;

const UpInput = props => {
  return <Input {...props} />;
};

const UpdateInput = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
}) => {
  return (
    <Container>
      <UpInput
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

export default UpdateInput;
