/* action Creater로 action JS파일 */

import {GET_CAL} from '../types';
import axios from 'axios';

/* 서버에 저장된 Calendar 데이터를 가져오기 위한 함수 */
export function getCal() {
  const request = axios({
    method: 'GET',
    url: 'https://scheduler-app-df3b5-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json',
  })
    .then(response => {
      const calData = [];
      for (let key in response.data) {
        if (response.data[key]) {
          calData.push({
            ...response.data[key],
          });
        }
      }
      return calData;
    })
    .catch(err => {
      alert('GET FAILD');
      return false;
    });
  return {
    type: GET_CAL,
    payload: request,
  };
}
