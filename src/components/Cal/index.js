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
} from 'react-native';
import TextTruncate from 'react-native-text-truncate';

import {connect} from 'react-redux';
import {getCal} from '../../store/actions/cal_actions';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Cal extends Component {
  // app에 입장에서는 store에 정의한 Action Creator에 존재를 모르기 때문에
  // reducer에게 액션을 발생시키려는 dispatch가 포함된 componentDidMount() 함수를 실행시킴
  // 앱이 렌더링 될 때마다 호출되게 함
  // 이렇게 하면 store가 reducer를 실행시키고 리듀서에서 state 업데이트가 이루어짐
  componentDidMount() {
    this.props.dispatch(getCal());
  }
  renderCal = Cals =>
    Cals.documents
      ? // 7개의 데이터를 각각 접근하고, 각각 데이터 출력
        Cals.documents.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.navigation.navigate('CalEdit', {
                // 넘어가는 데이터(파라메타)
                newCal: false,
                calData: item,
                index: index,
                id: item.data.id,
              });
            }}>
            <View style={styles.CalContainer}>
              <View style={{height: 160}}>
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
                      Date: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.date}</Text>
                  </View>
                ) : null}

                {item.data.title ? (
                  <View style={styles.dateView}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Title: &nbsp;
                    </Text>
                    <Text style={{fontSize: 16}}>{item.data.title}</Text>
                  </View>
                ) : null}

                {item.data.description ? (
                  <View style={{paddingTop: 7, paddingLeft: 7}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Description: &nbsp;
                    </Text>
                    <TextTruncate style={{fontSize: 16}} numberOfLines={2}>
                      {item.data.description}
                    </TextTruncate>
                  </View>
                ) : null}
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
    return (
      <ImageBackground
        style={styles.imageBg}
        source={require('../../assets/images/sky.jpg')}
        blurRadius={5}
        imageStyle={{opacity: 0.5}}>
        <View>
          <ScrollView>{this.renderCal(this.props.Cals)}</ScrollView>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: screenWidth * 0.8,
              top: screenHeight * 0.7,
            }}
            onPress={() => {
              // 새롭게 작성된 데이터를 넘겨줌
              this.props.navigation.navigate('CalEdit', {
                newCal: true,
                index: this.props.Cals.documents.length, // length를 이용하면 배열의 개수를 알 수 있음
                id: this.checkNextID(this.props.Cals),
              });
            }}>
            <Image
              source={require('../../assets/images/edit_calendar.png')}
              style={{tintColor: '#d45353', width: 50, height: 50}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
    // backgroundColor: '',
  },
  CalContainer: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#cccccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderRadius: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    // fontFamily: 'ShadowsIntoLight',
    fontSize: 40,
    color: '#8B0000',
    width: '100%',
    // alignItems: 'flex-end',
    paddingTop: 10,
    paddingLeft: 25,
    textShadowColor: '#B87D64', // 'rgba(0, 0, 0, 0.75)'
    textShadowOffset: {width: 4, height: 4},
    textShadowRadius: 8,
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
  };
}

export default connect(mapStateToProps)(Cal);
