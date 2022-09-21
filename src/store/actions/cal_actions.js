/* action Creater로 action JS파일 */

import {GET_CAL} from '../types';
import axios from 'axios';
import {auth, database} from '../../utils/misc';

/* 서버에 저장된 Calendar 데이터를 가져오기 위한 함수 */
export function getCal(User) {
  // 만약 로그인이 되어있다면, 파라메터(User)에 firebase가 인식하고 있는 로그인 정보가 들어감
  // auth.onAuthStateChanged(user => {
  //   if (user) {
  //     console.warn('user id is... ' + user);
  //   } else {
  //     console.warn('not logged in...');
  //   }
  // });

  return dispatch => {
    const url = `CalendarList/${User.auth.userId}`;
    database.ref(url).on('value', dataSnapShot => {
      /* index 번호 정렬 */
      const calData = [];
      for (let key in dataSnapShot.val()) {
        if (dataSnapShot.val()[key]) {
          calData.push({
            ...dataSnapShot.val()[key],
          });
        }
      }
      dispatch({type: GET_CAL, payload: calData});
    });
  };
}
