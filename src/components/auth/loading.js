import React, {Component} from 'react';
import {Animated, View, ShadowStyleIOS} from 'react-native';
import {auth} from '../../utils/misc';

const LogoImage = require('../../assets/images/scheduler_app_logo.png');

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xValue: new Animated.Value(60),
      opacity: new Animated.Value(0),
    };
  }

  /* 로딩 화면이 끝나고 화면 이동 */
  onComplete = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // 로그인이 되어있는 상태
        this.props.navigation.navigate('TabNav');
      } else {
        // 로그인이 되어있지 않는 상태
        this.props.navigation.navigate('SignIn');
      }
    });
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1, // 투명도
      duration: 2000, // 2초 동안 진행
    }).start(() => {
      // 시작을 하고, 함수 호출
      this.onComplete();
    });
  };
  render() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: '#3e7caa',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.Image
          source={LogoImage}
          style={{
            width: 300,
            height: 80,
            opacity: this.state.opacity,
            left: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [60, 0],
            }),
          }}
          onLoad={this.onLoad}></Animated.Image>
      </View>
    );
  }
}

export default Loading;
