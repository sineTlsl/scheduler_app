/* action Creator로 action JS파일 */
import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';

// axios는 브라우저나 서버를 위한 HTTP 클라이언트(요청)이고,
// 프로미스 형태(결과값이 무엇이든 상관없음)라 비동기작업 후에 콜백
import axios from 'axios';
import {SIGNUP, SIGNIN, REFRESH, auth} from '../../utils/misc';

/* refToken 값을 인자로 받아와서 body payload로 담아서 request를 해줄 Action Creators */
export const autoSignIn = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: 'grant_type=refresh_token&refresh_token=' + refToken,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      alert('에러 발생');

      return false;
    });
  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
};

firebaseLogin = async (email, password) => {
  try {
    let user = await auth.signInWithEmailAndPassword(email, password); // 로그인 정보가 담겨있음
    console.warn('User: ', user);
  } catch (err) {
    // console.warn('Error: ', error);
  }
};

/*
 * action Creator - signIn()
 * @returns 액션 크리에이터는 액션을 반환해줌
 */
export function signIn(data) {
  firebaseLogin(data.email, data.password);

  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      alert('에러 발생');

      return false;
    });
  return {
    type: SIGN_IN,
    payload: request,
  };
}

export function signUp(data) {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    header: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      console.log(response.data);
      alert('회원가입 완료');
      return response.data;
    })
    .catch(err => {
      alert('에러 발생');
      return false;
    });

  return {
    type: SIGN_UP,
    payload: request,
  };
}
