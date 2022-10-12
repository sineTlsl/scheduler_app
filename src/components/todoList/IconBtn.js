import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, View} from 'react-native';
import {icons} from './icons';
import PropTypes from 'prop-types';

const Icon = styled.Image`
  width: 28px;
  height: 28px;
  margin: 10px;
  tint-color: ${({completed}) => (completed ? '#b3aaa4' : '#55483E')};
`;

const IconBtn = ({icon, onPress, item}) => {
  /* 언더바 onpress 함수 
        : Props로 전달된 onpress 함수가 실행될 때 아이디를 파라메타로 전달 */
  const _onPress = () => {
    onPress(item.id);
  };
  return (
    <TouchableOpacity onPress={_onPress}>
      <View>
        <Icon source={icon} completed={item.completed} />
      </View>
    </TouchableOpacity>
  );
};

IconBtn.defaultProps = {
  item: {completed: false},
};

IconBtn.propTypes = {
  // oneOf()는 배열로 전달되어야 하는데, icon은 객체라 배열로 변경해야함
  icon: PropTypes.oneOf(Object.values(icons)).isRequired, // 아이콘 중 하나 선택하기 위함.
  onPress: PropTypes.func,
  item: PropTypes.object,
};

export default IconBtn;
