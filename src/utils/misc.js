export const APIKEY = `AIzaSyB4WHnlC3wFBnvOB4iuBDYz7TYLIMXJq_U`;
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @param {*} values async 객체로 받아오는 것
 * @param {*} callBack 콜백 함수
 * @returns 토큰을 저장
 */
export const setTokens = async (values, callBack) => {
  const firstPair = ['@scheduler_app@userId', values.userId];
  const secondPair = ['@scheduler_app@token', values.token];
  const thirdPair = ['@scheduler_app@refToken', values.refToken];

  try {
    // await: promisc를 반환하는 함수가 어떤 결과를 낼 때까지 자바스크립트한테 다른 작업을 하지 말고 기다리라고 하는 역할
    // 개인 식별자를 저장하는 것은 굉장히 중요한 일이기 때문에 비동기로 처리하는 것이고 다른 작업을 허용하지 않음
    await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]).then(
      response => {
        callBack();
      },
    );
  } catch (e) {
    // save error
  }

  console.log('Done.');
};

/**
 * @returns 저장한 토큰을 불러옴
 */
export const getTokens = async () => {
  let values;
  try {
    values = await AsyncStorage.multiGet([
      '@sieunDiary_app@userId',
      '@sieunDiary_app@token',
      '@sieunDiary_app@refToken',
    ]);
  } catch (e) {
    // read error
  }

  // example console.log output:
  // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
};
