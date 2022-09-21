/* 아이디, 패스워드를 다루는 JS파일 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TextInput,
} from 'react-native';
import Input from '../../utils/forms/input';
import ValidationRules from '../../utils/forms/validationRules';

// 기본적으로 react native 컴포넌트를 react 흐름으로 태우는 것은 불가능하여
// react-redux의 connect 함수를 가져옴
import {connect} from 'react-redux';
import {signIn, signUp} from '../../store/actions/user_actions';

// 위 두개의 액션 크리에이터를 묶어주는 함수를 가져옴
import {bindActionCreators} from 'redux';

import {setTokens} from '../../utils/misc';

class AuthForm extends Component {
  state = {
    type: '로그인', // 로그인 화면인지 회원가입 화면인지 구분하기 위한 인자  // 로그인 / 등록
    /* 회원가입 화면으로 전환해주는 인자 */
    action: '로그인', // 로그인 / 등록
    actionMode: '회원가입', // 회원가입 / 로그인 화면으로
    hasErrors: false, // error 발생 시 true로 변환하여 경고창 발생하는 인자
    form: {
      email: {
        value: '',
        type: 'textinput',
        rules: {
          isRequired: true, // 반드시 입력되어야 하는 값
          isEmail: true, // 이메일 형식 true
        },
        valid: false, // 입력된 텍스트 값이 임의로 지정한 default 값이 부합한지 확인하는 인자
      },
      password: {
        value: '',
        type: 'textinput',
        rules: {
          isRequired: true,
          minLenght: 6, // 최소 6글자 이상
        },
        valid: false, // 입력된 텍스트 값이 임의로 지정한 default 값이 부합한지 확인하는 인자
      },
      confirmPassword: {
        value: '',
        type: 'textinput',
        rules: {
          confirmPassword: 'password', // password 객체에 접근하여 그 룰을 검증
        },
        valid: false, // 입력된 텍스트 값이 임의로 지정한 default 값이 부합한지 확인하는 인자
      },
    },
  };

  /* 업데이트 */
  updateInput = (name, value) => {
    this.setState({
      hadErros: false,
    });
    let formCopy = this.state.form; // email, password, confirmPassword 객체를 가지고 있음
    formCopy[name].value = value; // 이름이 같은 객체를 찾아서 값을 업데이트 해줌

    // rules
    let rules = formCopy[name].rules; // formCopy의 name에 접근해서 rules 값을 할당해줌
    let valid = ValidationRules(value, rules, formCopy);
    formCopy[name].valid = valid;

    this.setState({
      form: formCopy,
    });
    // console.warn(this.state.form);
  };

  /* 회원가입 시애 비밀번호 재확인 */
  confirmPassword = () => {
    return (
      // type 값이 로그인이 아닐 경우에만 입력란을 추가시킴
      this.state.type != '로그인' ? (
        <Input
          value={this.state.form.confirmPassword.value}
          type={this.state.form.confirmPassword.type}
          secureTextEntry={true} // 텍스트를 별표(*)로 변경해줌
          placeholder="비밀번호 재입력"
          placeholderTextColor="grey"
          onChangeText={value => this.updateInput('confirmPassword', value)}
        />
      ) : null
    );
  };

  /* 로그인 error */
  formHasErrors = () => {
    return this.state.hasErrors ? (
      <View style={{margin: 15, padding: 15, backgroundColor: '#ee3344'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 15,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textAlign: 'center',
          }}>
          로그인 정보를 다시 확인해주세요.
        </Text>
      </View>
    ) : null;
  };

  /* Form 체인지 */
  changeForm = () => {
    const type = this.state.type;

    this.setState({
      type: type === '로그인' ? '등록' : '로그인',
      action: type === '로그인' ? '등록' : '로그인',
      actionMode: type === '로그인' ? '로그인 화면으로' : '회원가입',
    });
  };

  /* Form 전송 */
  submitUser = () => {
    // Init.
    let isFormValid = true; // 이메일이나 패스워드가 규칙이 어긋나는지 확인
    let submittedForm = {};
    const formCopy = this.state.form;

    for (let key in formCopy) {
      // 로그인이랑 회원가입 구분
      if (this.state.type === '로그인') {
        if (key !== 'confirmPassword') {
          // 이메일 주소랑 패스워드의 valid가 true일 때 isFormValid가 true가 됨
          isFormValid = isFormValid && formCopy[key].valid;
          submittedForm[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        submittedForm[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === '로그인') {
        // 입력 값을 action creator로 넘겨줌
        this.props.signIn(submittedForm).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(submittedForm).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({
        hasErrors: true,
      });
    }
  };

  /* Action Creator의 콜백 함수 */
  manageAccess = () => {
    // userId가 없다면, 에러 발생
    if (!this.props.User.auth.userId) {
      this.setState({
        hasErrors: false,
      });
    } // userId가 있다면, multSet 메소드를 호출하고 메인화면으로 이동
    else {
      setTokens(this.props.User.auth, () => {
        this.setState({hasErrors: false});
        // this.props.goWithoutLogin();
        this.props.navigation.push('TabNav');
      });
    }
  };

  render() {
    return (
      <View>
        <Input
          value={this.state.form.email.value}
          type={this.state.form.email.type}
          autoCapitalize={'none'} // 첫 글자 대소문자 사용 안함
          placeholder=" 이메일 주소를 입력하세요."
          placeholderTextColor="grey"
          onChangeText={value => this.updateInput('email', value)}
        />
        <Input
          value={this.state.form.password.value}
          type={this.state.form.password.type}
          secureTextEntry={true} // 텍스트 별표(*)로 변경해줌
          placeholder=" 비밀번호를 입력하세요."
          placeholderTextColor="grey"
          onChangeText={value => this.updateInput('password', value)}
        />
        {this.confirmPassword()}
        {this.formHasErrors()}
        <View style={{marignTop: 100}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 25,
            }}>
            <Button
              title={this.state.action}
              color="#ddd"
              onPress={() => this.submitUser()}
            />
            <Button
              title={this.state.actionMode}
              color="#ddd"
              onPress={() => this.changeForm()}
            />
            <Button
              title="비회원 로그인"
              color="#ddd"
              onPress={() => this.props.goWithoutLogin()}
            />
          </View>
        </View>
      </View>
    );
  }
}

/**
 *
 * @param {*} User react native User 생성
 * @returns User라는 Props 생성(redux store 세게관에 있는 state.User를 가져옴)
 */
function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

/**
 *
 * @param {*} dispatch Dispatch는 위에서 Action Creater로 return 해준 Action을 파라메터로 받아서 store의 reducer에게 넘겨주는 역할을 해주는 열차
 * @returns bindActionCreators() 함수를 이용하여 이어줌
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn, signUp}, dispatch);
}

// react native 세계관과 redux 세계관을 이어줌
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
