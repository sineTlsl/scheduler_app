/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';
import reducers from './src/store/reducers';
import thunkMiddleware from 'redux-thunk';

// import reducers from './app'

// redux 개발자 도구와 Middleware를 같이 사용하기 위해 사용  // 크롬 확장 프로그램에 작성되어 있는 자바스크립트 함수
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunkMiddleware)),
);
const appRedux = () => (
  // store 생성. 앱 전체를 store를 prop로 갖는 Provider로 감싸줌
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => appRedux);
