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
      if (value[1][1] != null) {
        this.props.autoSignIn(value[2][1]).then(() => {
          if (this.props.User.auth.token)
            setTokens(this.props.User.auth, () => {
              this.goWithoutLogin();
            });
        });
      }
    });
    // 전 화면 이동을 막음
    this.props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }

  render() {
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
