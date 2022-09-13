/* 로그인 화면에 생성할 로그 JS파일 */

import React from 'react';
import {View, Image} from 'react-native';

import LogoImg from '../../assets/images/scheduler_app_logo.png';

const AuthLogo = () => {
  return (
    <View style={{alignItems: 'center', marginBottom: 25}}>
      <Image
        source={LogoImg}
        resizeMode={'contain'}
        style={{
          // width: ,
          height: 95,
        }}
      />
    </View>
  );
};

export default AuthLogo;
