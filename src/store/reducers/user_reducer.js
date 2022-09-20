// Reducer는 이전 단계의 state와 액션의 두 인자를 받아와서 새로운 state를 리턴
// 여기서 얘기하는 state는 각 클래스에서 선언해서 사용하는 애가 아니고, store에서 관리해주는 state를 의미

import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

export default function (state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        // 기존에 state와 auth를 리턴
        ...state,
        auth: {
          userId: action.payload.localId || false, // action으로부터 아무런 값을 받지 못했을 때 false를 리턴
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        },
      };

    case SIGN_UP:
      return {
        // 기존에 state와 auth를 리턴
        ...state,
        auth: {
          userId: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        },
      };

    case AUTO_SIGN_IN:
      return {
        // 기존에 state와 auth를 리턴
        ...state,
        auth: {
          userId: action.payload.user_id || false, // 여기에 할당되는 userId가 파이어베이스에서 제공하는 유저 식별자
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false,
        },
      };

    default:
      return state;
  }
}
