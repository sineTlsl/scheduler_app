import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens import
import SignIn from './components/auth';

import Cal from './components/Cal';
import CalEdit from './components/Cal/CalEdit';
import CalDate from './components/Cal/CalDate';

import TodoList from './components/TodoList';
import TodoEdit from './components/TodoList/TodoEdit';
import LogoTitle from './utils/logoTitle';
import Loading from './components/auth/loading';

// Icon import
import Icon from 'react-native-vector-icons/Ionicons';

const TabBarIcon = (focused, name) => {
  let iconName, iconSize;

  if (name === 'Cal') {
    iconName = 'calendar-outline';
  } else if (name === 'Todo') {
    iconName = 'list-outline';
  }

  if (focused) iconSize = 35;
  else iconSize = 28;

  return <Icon name={iconName} size={iconSize} color="#fff" />;
};

const AuthStack = createStackNavigator();
const MainScreenTab = createBottomTabNavigator();
const CalStack = createStackNavigator();
const TodoStack = createStackNavigator();

// 헤더 스타일
const headerConfig = {
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#3e7caa',
  },
  headerImage: <LogoTitle />,
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
  },
};

// 헤더 스타일
const headerConfig_ = {
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#3e7caa',
  },
  headerImage: <LogoTitle />,
  headerTitleStyle: {
    flex: 1,
    textAlign: 'center',
  },
  headerLeft: null,
};

/*
  Stack Navigator
    - Stack Screen A

  Stack Navigator
    - Tab Navigator
      - Tab Screen B
      - Tab Screen C
*/

/* Calendar에 쓰일 Stack Nav 컴포넌트 */
const CalNav = () => {
  return (
    <CalStack.Navigator screenOptions={{headerShown: false}}>
      <CalStack.Screen name="Cal" component={Cal} />
      <CalStack.Screen name="CalEdit" component={CalEdit} />
      <CalStack.Screen name="CalDate" component={CalDate} />
    </CalStack.Navigator>
  );
};

/* ToDoList에 쓰일 Stack Nav 컴포넌트 */
const TodoNav = () => {
  return (
    <TodoStack.Navigator screenOptions={{headerShown: false}}>
      <TodoStack.Screen
        name="Todo"
        component={TodoList}
        options={headerConfig_}
      />
      <TodoStack.Screen
        name="TodoEdit"
        component={TodoEdit}
        options={headerConfig}
      />
    </TodoStack.Navigator>
  );
};

/* Bottom Tab Nav 컴포넌트 */
const TabNav = () => {
  return (
    <MainScreenTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true, // 키보드가 생성될 때 탭 바를 가려줌
        showLabel: false,
        activeBackgroundColor: '#296592',
        inactiveBackgroundColor: '#3e7caa',
        style: {
          backgroundColor: '3e7caa',
        },
      }}
      // initialRouteName="Cal"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
      })}>
      <MainScreenTab.Screen
        name="Cal"
        component={CalNav}
        options={{headerShown: false}}
      />
      <MainScreenTab.Screen
        name="Todo"
        component={TodoNav}
        options={{headerShown: false}}
      />
    </MainScreenTab.Navigator>
  );
};

/* 최상의 Root Nav 컴포넌트 */
// 로그인이 되어있지 않으면 로그인 페이지로 넘어가고, 로그인이 되어있을 경우에는 Bottom Nav로 이동
export const RootNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Loading" component={Loading} />
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={() => ({gestureEnabled: false})}
      />
      <AuthStack.Screen
        name="TabNav"
        component={TabNav}
        options={() => ({gestureEnabled: false})}
      />
    </AuthStack.Navigator>
  );
};
