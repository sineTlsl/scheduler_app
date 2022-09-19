import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AuthLogo from './authLogo';
import AuthForm from './authForm';
import {getTokens, setTokens} from '../../utils/misc';
import {autoSignIn} from '../../store/actions/user_actions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Auth extends Component {
  /* loading이 true이면 ActivityIndicator 화면을 보여주고,
     false이면 login 화면으로 사용하는 상태 변수 */
  state = {
    loading: false,
  };

  goWithoutLogin = () => {
    this.props.navigation.navigate('TabNav');
  };

  componentDidMount() {
    /* 
      value.....
            ['@scheduler_app@userId', 'dfsdf...'],
            ['@scheduler_app@token', 'dffsffasfdasdf...'],
            ['@scheduler_app@refToken', 'dfsfsfasfdaf...'],
    */
    getTokens(value => {
      // value 값은 배열로 되어있는데 그 값이 Null이라면, 로그인 화면을 보여줌
      if (value[1][1] === null) {
        this.setState({loading: false});
      } else {
        // value[1][1]에 값이 들어가 있다면, autoSignIn() 함수 호출
        this.props.autoSignIn(value[2][1]).then(() => {
          // 유저의 auth의 토큰이 없다면, 로딩은 false로 돌려 로그인 화면으로 이동
          if (!this.props.User.auth.token) {
            this.setState({loading: false});
          } else {
            // 유저의 auth의 토큰이 있다면, 메인 화면으로 이동
            setTokens(this.props.User.auth, () => {
              this.goWithoutLogin();
            });
          }
        });
      }
      console.log('Get Tokens: ', value);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View>
          <AuthLogo />
          <AuthForm goWithoutLogin={this.goWithoutLogin} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3e7caa',
    paddingTop: 160,
    paddingLeft: 40,
    paddingRight: 40,
  },
});

function mapStateToProps(state) {
  return {
    User: state.User,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({autoSignIn}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
