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

class CalDate extends Component {
  render() {
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
              <Text style={styles.dayText}>September, 23, 2022</Text>
              <View style={styles.radiusView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={styles.timeText}>8:00 ~ 23:30</Text>
                  <Text style={styles.timeText}>알바</Text>
                </View>
                <View style={styles.addIconView}>
                  <TouchableOpacity style={styles.inputCalendar}>
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

export default CalDate;
