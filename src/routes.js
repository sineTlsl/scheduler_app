import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens import
import SignIn from './components/auth';
import Cal from './components/Cal';
import CalEdit from './components/Cal/CalEdit';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoList/TodoEdit';
import LogoTitle from './utils/logoTitle';

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

/* Calendar에 쓰일 Stack Nav 컴포넌트 */
const CalNav = () => {
  return (
    <CalStack.Navigator>
      <CalStack.Screen name="Cal" component={Cal} options={headerConfig} />
      <CalStack.Screen
        name="CalEdit"
        component={CalEdit}
        options={headerConfig}
      />
    </CalStack.Navigator>
  );
};

/* ToDoList에 쓰일 Stack Nav 컴포넌트 */
const TodoNav = () => {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen
        name="Todo"
        component={TodoList}
        options={headerConfig}
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
        showLabel: false,
        activeBackgroundColor: '#296592',
        inactiveBackgroundColor: '#3e7caa',
        style: {
          backgroundColor: '3e7caa',
        },
      }}
      initialRouteName="Cal"
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
