import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import TextTruncate from 'react-native-text-truncate';
import {Calendar} from 'react-native-calendars';

import {connect} from 'react-redux';
import {getCal} from '../../store/actions/cal_actions';

import {getTokens, setTokens, auth, removeTokens} from '../../utils/misc';
import {autoSignIn} from '../../store/actions/user_actions';
import Icon from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Cal extends Component {
  state = {
    isAuth: true, // 로그인이 되어있는지 판단 여부
  };

  /* state 값을 갱신해주는 메소드 */
  manageState = isAuth => {
    this.setState({
      isAuth,
    });
  };

  // app에 입장에서는 store에 정의한 Action Creator에 존재를 모르기 때문에
  // reducer에게 액션을 발생시키려는 dispatch가 포함된 componentDidMount() 함수를 실행시킴
  // 앱이 렌더링 될 때마다 호출되게 함
  // 이렇게 하면 store가 reducer를 실행시키고 리듀서에서 state 업데이트가 이루어짐
  componentDidMount() {
    getTokens(value => {
      // value 값은 배열로 되어있는데 그 값이 Null이라면, 로그인 화면을 보여줌
      if (value[1][1] === null) {
        this.manageState(false);
      } else {
        // value[1][1]에 값이 들어가 있다면, autoSignIn() 함수 호출
        this.props.dispatch(autoSignIn(value[2][1])).then(() => {
          // 유저의 auth의 토큰이 없다면, manageState(false)로 전달
          if (!this.props.User.auth.token) {
            this.manageState(false);
          } else {
            // 유저의 auth의 토큰이 있다면, 로그인이 된 상태라는 걸 인지
            setTokens(this.props.User.auth, () => {
              this.manageState(true);
              this.props.dispatch(getCal(this.props.User));
            });
          }
        });
      }
    });
    /* navigation의 물리적인 back 버튼이 disable 됨 */
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  renderCal = (Cals, User) =>
    Cals.documents
      ? // 7개의 데이터를 각각 접근하고, 각각 데이터 출력
        Cals.documents.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.navigation.push('CalEdit', {
                // 넘어가는 데이터(파라메타)
                newCal: false,
                calData: item,
                index: index,
                id: item.data.id,
                userId: User.auth.userId,
              });
            }}>
            <View style={styles.CalContainer}>
              <View style={{height: 80}}>
                {item.data.imagePath ? (
                  <View style={styles.indexView}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                      # {index + 1}
                    </Text>
                    <Image
                      source={require('../../assets/images/photo.png')}
                      resizeMode={'contain'}
                      style={{width: 20, height: 20}}
                    />
                  </View>
                ) : (
                  <View style={{paddingTop: 7, paddingLeft: 7}}>
                    <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                      # {index + 1}
                    </Text>
                  </View>
                )}

                {item.data.date ? (
                  <View style={styles.dateView}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      날짜: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.date}</Text>
                  </View>
                ) : null}

                {item.data.title ? (
                  <View style={styles.dateView}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      제목: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.title}</Text>
                  </View>
                ) : null}
                {/* {item.data.startTime ? (
                  <View style={styles.dateView}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      시작 시간: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.startTime}</Text>
                  </View>
                ) : null}
                {item.data.endTime ? (
                  <View style={styles.dateView}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      종료 시간: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.endTime}</Text>
                  </View>
                ) : null} */}

                {/* {item.data.memo ? (
                  <View style={{paddingTop: 7, paddingLeft: 7}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Memo: &nbsp;
                    </Text>
                    <TextTruncate style={{fontSize: 16}} numberOfLines={2}>
                      {item.data.memo}
                    </TextTruncate>
                  </View>
                ) : null} */}
              </View>
            </View>
          </TouchableOpacity>
        ))
      : null;
  checkNextID = Cals => {
    if (Cals.documents.length > 0) {
      let numOfArrElements = Cals.documents.length;
      let lastCalIdx = Number(numOfArrElements) - 1;
      let nextCalID = Cals.documents[lastCalIdx].data.id + 1; // 배열의 인덱스를 접근해서 아이디값을 가져오고 + 1을 더함

      return nextCalID;
    } else {
      return 0;
    }
  };

  render() {
    // this.headerStyle();
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.5}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.titleText}>SCHEDULER</Text>
            <TouchableOpacity
              style={{paddingRight: 15}}
              onPress={() => {
                auth
                  .signOut()
                  .then(() => {
                    removeTokens(() => {
                      this.props.navigation.navigate('SignIn');
                    });
                  })
                  .catch(err => {
                    alert('Logout Failed: ', err.message);
                  });
              }}>
              <Image
                source={require('../../assets/images/logout.png')}
                resizeMode="contain"
                style={{width: 23, height: 23}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.calendarView}>
            <View style={styles.calendarRadius}>
              <Calendar
                style={{height: 350, justifyContent: 'center', marginTop: 15}}
              />

              <View style={styles.calendarButtonView}>
                <TouchableOpacity style={styles.cancelButtonStyle}>
                  <Text style={styles.cancelText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.okButtonStyle}
                  // onPress={() => navigation.navigate('DayCheck', {selectedDate})}
                >
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            {this.state.isAuth ? (
              <ScrollView>
                <View style={{flexDirection: 'column-reverse'}}>
                  {this.renderCal(this.props.Cals, this.props.User)}
                </View>
              </ScrollView>
            ) : (
              <View
                style={{
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon name="sad-outline" size={100} color="#296592" />
                <Text style={{margin: 20, fontSize: 17}}>
                  로그인이 필요한 화면입니다.
                </Text>
                <Button
                  title="로그인 / 회원가입"
                  color="#296592"
                  onPress={() => this.props.navigation.navigate('SignIn')}
                />
              </View>
            )}
            {this.state.isAuth ? (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: screenWidth * 0.8,
                  top: screenHeight * 0.7,
                }}
                onPress={() => {
                  // 새롭게 작성된 데이터를 넘겨줌
                  this.props.navigation.push('CalEdit', {
                    newCal: true,
                    index: this.props.Cals.documents.length, // length를 이용하면 배열의 개수를 알 수 있음
                    id: this.checkNextID(this.props.Cals),
                    userId: this.props.User.auth.userId,
                  });
                }}>
                <Image
                  source={require('../../assets/images/edit_calendar.png')}
                  style={{tintColor: '#d45353', width: 50, height: 50}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  CalContainer: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#cccccc',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'ShadowsIntoLight',
    fontSize: 40,
    color: '#8B0000',
    // alignItems: 'flex-end',
    // paddingTop: 30,
    paddingLeft: 25,
    textShadowColor: '#B87D64', // 'rgba(0, 0, 0, 0.75)'
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
  },
  calendarView: {
    flex: 1,
    // paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    // justifyContent: 'center',
  },
  calendarRadius: {
    backgroundColor: '#55483E', // 57B9BB
    // alignItems: "center",
    width: '100%',
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  calendarButtonView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  cancelButtonStyle: {
    width: 118,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // marginBottom: 20,
  },
  cancelText: {
    fontSize: 14,
    color: '#222222',
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  okButtonStyle: {
    width: 118,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55483E', // 57B9BB
  },
  okText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  indexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingRight: 7,
    paddingLeft: 12,
    alignItems: 'center',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'baseline', // 밑줄 정렬
    paddingTop: 7,
    paddingLeft: 7,
  },
});

function mapStateToProps(state) {
  return {
    Cals: state.Cals,
    User: state.User,
  };
}

export default connect(mapStateToProps)(Cal);
