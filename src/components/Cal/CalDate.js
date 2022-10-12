/* Calendaer Task add 작성을 위한 화면 구성 JS파일 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {getCal} from '../../store/actions/cal_actions';

import {getTokens, setTokens} from '../../utils/misc';

class CalDate extends Component {
  constructor(props) {
    super(props);

    selectDay = this.props.route.params.selectDay; // 데이터 전달 받기
  }

  /* state 값을 갱신해주는 메소드 */
  manageState = isAuth => {
    this.setState({
      isAuth,
    });
  };
  // 앱이 렌더링 될 때마다 호출되게 함
  // 이렇게 하면 store가 reducer를 실행시키고 리듀서에서 state 업데이트가 이루어짐
  componentDidMount() {
    // this.props.dispatch(
    //   getCal(
    //     getTokens(value => {
    //       // value 값은 배열로 되어있는데 그 값이 Null이라면, 로그인 화면을 보여줌
    //       if (value[1][1] === null) {
    //         this.manageState(false);
    //       } else {
    //         // value[1][1]에 값이 들어가 있다면, autoSignIn() 함수 호출
    //         this.props.dispatch(autoSignIn(value[2][1])).then(() => {
    //           // 유저의 auth의 토큰이 없다면, manageState(false)로 전달
    //           if (!this.props.User.auth.token) {
    //             this.manageState(false);
    //           } else {
    //             // 유저의 auth의 토큰이 있다면, 로그인이 된 상태라는 걸 인지
    //             setTokens(this.props.User.auth, () => {
    //               this.manageState(true);
    //               this.props.dispatch(getCal(this.props.User));
    //             });
    //           }
    //         });
    //       }
    //     }),
    //   ),
    // );
  }

  renderCal = (Cals, User) =>
    Cals.documents // 7개의 데이터를 각각 접근하고, 각각 데이터 출력
      ? Cals.documents.map((item, index) => (
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
            {item.data.date === selectDay ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text style={styles.timeText}>
                  {item.data.startTime} ~ {item.data.endTime}
                </Text>
                <Text style={styles.timeText}>{item.data.title}</Text>
              </View>
            ) : null}
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
    const selectDay = this.props.route.params.selectDay; // 데이터 전달 받기
    const selectDate = selectDay.split('-'); // 문자열 분리

    const selectMonth = () => {
      if (selectDate[1] == '01') return 'January';
      else if (selectDate[1] == '02') return 'February';
      else if (selectDate[1] == '03') return 'March';
      else if (selectDate[1] == '04') return 'April';
      else if (selectDate[1] == '05') return 'May';
      else if (selectDate[1] == '06') return 'June';
      else if (selectDate[1] == '07') return 'July';
      else if (selectDate[1] == '08') return 'August';
      else if (selectDate[1] == '09') return 'September';
      else if (selectDate[1] == '10') return 'October';
      else if (selectDate[1] == '11') return 'November';
    };

    console.log('selectDay: ' + selectDay);
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.5}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.titleText}>SCHEDULER</Text>
          <View style={styles.container}>
            <View style={styles.radiusCon}>
              <Text style={styles.dayText}>
                {selectMonth()}, {selectDate[2]}, {selectDate[0]}
              </Text>
              <View style={styles.radiusView}>
                {this.renderCal(this.props.Cals, this.props.User)}
                <View style={styles.addIconView}>
                  <TouchableOpacity
                    style={styles.inputCalendar}
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
                      style={{tintColor: '#fff', width: 50, height: 50}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  titleText: {
    fontFamily: 'ShadowsIntoLight',
    fontSize: 40,
    color: '#8B0000',
    // alignItems: 'flex-end',
    // paddingTop: 30,
    paddingLeft: 25,
    textShadowColor: '#b87d64', // 'rgba(0, 0, 0, 0.75)'
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
  },
  dayText: {
    fontFamily: 'DoHyeon-Regular',
    alignItems: 'center',
    fontSize: 30,
    textShadowColor: 'black',
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
    marginBottom: 20,
    color: '#fff',
  },
  radiusCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusView: {
    height: '60%',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingTop: '5%',
    paddingLeft: '8%',
    paddingRight: '8%',
    marginBottom: '10%',
  },
  addIconView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 12,
    marginLeft: 'auto',
    marginBottom: '8%',
    marginRight: 0,
  },
  inputCalendar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 73,
    height: 73,
    backgroundColor: '#d58586',
    borderRadius: 100,
  },
  timeText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

function mapStateToProps(state) {
  return {
    Cals: state.Cals,
    User: state.User,
  };
}

export default connect(mapStateToProps)(CalDate);
