import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens import
import SignIn from './components/auth';
import Cal from './components/calendar';
import TodoList from './components/todoList';
import Memo from './components/memo';

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();

/*
  Stack Navigator
    - Stack Screen A

  Stack Navigator
    - Tab Navigator
      - Tab Screen B
      - Tab Screen C
*/

// true: 다이어리와 뉴스 탭이 있는 Bottom Nav으로 출력.
// 로그인 여부를 알려줄 Boolean 변수
const isLoggedIn = false;

/* Bottom Tab Nav 컴포넌트 */
const TabNav = () => {
  return (
    <MainScreenTab.Navigator>
      <MainScreenTab.Screen name="Cal" component={Cal} />
      <MainScreenTab.Screen name="TodoList" component={TodoList} />
      <MainScreenTab.Screen name="Memo" component={Memo} />
    </MainScreenTab.Navigator>
  );
};

/* 최상의 Root Nav 컴포넌트 */
// 로그인이 되어있지 않으면 로그인 페이지로 넘어가고, 로그인이 되어있을 경우에는 Bottom Nav로 이동
export const RootNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <AuthStack.Screen name="Main" component={TabNav} />
      ) : (
        <>
          <AuthStack.Screen name="SignIn" component={SignIn} />
          <AuthStack.Screen name="TabNav" component={TabNav} />
        </>
      )}
    </AuthStack.Navigator>
  );
};
