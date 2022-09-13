/* 로그인 화면에 생성할 TextInput JS파일 */

import {template} from '@babel/core';
import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

/* props를 인자로 받아오면 authForm.js에서 정의한 변수와 값들을 그대로 전달되고, 
   스프레드 오퍼레이터를 사용하는 이유는 전달받은 props를 그대로 사용한다는 의미 */
const input = props => {
  let template = null;
  switch (props.type) {
    case 'textinput':
      template = <TextInput {...props} style={styles.input} />;
      break;

    case 'textinputRevised':
      template = <TextInput {...props} style={styles.inputRevised} />;
      break;

    default:
      return template;
  }
  return template;
};

export default input;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 8,
    fontsize: 17,
    padding: 5,
    marginTop: 20,
  },
  inputRevised: {
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
    borderRadius: 8,
    fontsize: 17,
    padding: 5,
    marginTop: 30,
  },
});
