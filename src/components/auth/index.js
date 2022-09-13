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
import {getTokens} from '../../utils/misc';

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
    getTokens();
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

export default Auth;
