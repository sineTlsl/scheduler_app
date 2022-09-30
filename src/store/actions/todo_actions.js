/* action Creater로 action JS파일 */

import {GET_TODO} from '../types';
import axios from 'axios';
import {database} from '../../utils/misc_todo';

/* 서버에 저장된 투두리스트 데이터를 가져오기 위한 함수 */
export function getTodo() {
  const request = axios({
    method: 'GET',
    url: 'https://scheduler-app-df3b5.asia-southeast1.firebasedatabase.app/TodoList.json',
  })
    .then(response => {
      const todoData = []; // 비어있는 배열 할당
      for (let key in response.data) {
        if (response.data[key]) {
          todoData.push({
            ...response.data[key],
          });
        }
      }
      todoData.reverse(); // 역순으로 정렬
      return todoData;
    })
    .catch(err => {
      alert('Get Failed');
      return false;
    });
  return {
    type: GET_TODO,
    payload: request,
  };
}
