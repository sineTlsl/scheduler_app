import React from 'react';
import {Image} from 'react-native';

import logoImg from '../assets/images/scheduler_app_logo.png';

const LogoTitle = () => {
  return (
    <Image
      source={logoImg}
      style={{width: 120, height: 30}}
      resizeMode="contain"
    />
  );
};

export default LogoTitle;
