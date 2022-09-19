import {GET_CAL} from '../types';

/* reducer는 액션으로 정의된 어떠한 이벤트를 직접 수행하여 state에 변화를 일으킴 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CAL:
      return {
        ...state,
        // other state elemenets
        documents: action.payload || false,
      };
    default:
      return state;
  }
}
