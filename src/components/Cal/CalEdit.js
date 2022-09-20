/* TodoList 작성을 위한 화면 구성 JS파일 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {storage, database} from '../../utils/misc';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

class CalEdit extends Component {
  constructor(props) {
    super(props);
    const params = props.route.params;

    !params.newCal
      ? (this.state = {
          newCal: false,
          isLoading: false,
          index: params.index,
          calData: {
            id: params.calData.data.id,
            date: params.calData.data.date,
            title: params.calData.data.title,
            description: params.calData.data.description,
            imagePath: params.calData.data.imagePath,
          },
          image: '',
        })
      : (this.state = {
          newCal: true,
          isLoading: false,
          index: params.index,
          calData: {
            id: params.id,
            date: '',
            title: '',
            description: '',
            imagePath: '',
          },
        });

    // newCal이 false이고, imagePath가 존재할 때,
    !params.newCal && params.calData.data.imagePath ? this.getImage() : null;
  }

  onChangeInput = (item, value) => {
    if (item === 'date') {
      this.setState(prevState => ({
        calData: {
          ...prevState.calData,
          date: value,
        },
      }));
    } else if (item === 'title') {
      this.setState(prevState => ({
        calData: {
          ...prevState.calData,
          title: value,
        },
      }));
    } else if (item === 'description') {
      this.setState(prevState => ({
        calData: {
          ...prevState.calData,
          description: value,
        },
      }));
    }
  };

  getImage = () => {
    // .child: 하위 경로
    storage
      .ref('diaryImage')
      .child(`index${this.state.calData.id}/image.jpg`) // 스토리지 경로 참조
      .getDownloadURL()
      .then(url => {
        // 경로에 url 주소가 then 콜백함수로 넘어가게되고, 그 값을 URL로 받아오고,
        // setState에 선언이 image에 값을 할당
        this.setState({
          image: url,
        });
      });
  };

  selectImage = () => {
    // 디바이스 이미지 경로 리턴
    launchImageLibrary({}, response => {
      this.setState({
        image: response.uri,
      });
    });
    let imageDir = `diaryImage/index${this.state.calData.id}`;
    this.setState(prevState => ({
      calData: {
        ...prevState.calData,
        imagePath: imageDir, // 이미지 패스 경로 지정
      },
    }));
  };

  /* 삭제 데이터 함수 */
  deleteData = async () => {
    const id = this.state.calData.id;

    const databaseDirectory = `diary/${id}`;
    const databaseRef = database.ref(databaseDirectory).child('data');

    const storageDirectory = `diaryImage/index${id}`;
    const storageRef = storage.ref(storageDirectory).child('image.jpg');

    try {
      await databaseRef.remove(); // 데이터 삭제
      /* 이미지도 같이 삭제 */
      await storageRef
        .getDownloadURL()
        .then(() => {
          // 데이터를 삭제하기 위한 메소드
          storageRef.delete().then(() => {
            this.props.navigation.push('Cal');
          });
        })
        .catch(() => {
          // 데이터 삭제 실패
          this.props.navigation.push('Cal');
        });
    } catch (err) {
      alert('삭제 실패: ' + err.message);
    }
  };

  /* 수정 데이터 함수 */
  updateData = () => {
    this.setState({
      newCal: true,
    });
  };

  /* 완료 데이터 함수 */
  // 코드의 실행 순서를 보장받아야하므로 async를 사용
  createData = async () => {
    this.setState({
      isLoading: true,
    });

    const data = this.state.calData; // 업데이트되는 데이터 값 저장
    const id = data.id;

    const databaseDirectory = `diary/${id}`;
    const databaseRef = database.ref(databaseDirectory);
    const storageDirectory = `diaryImage/index${id}/image.jpg`;

    try {
      // set(): Realtime Database에 데이터를 쓰기위한 메소드
      await databaseRef.set({data}); // 데이터 업로드가 완료 되었다면,
      this.uploadImage(storageDirectory);
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      alert('저장 실패: ' + err.message);
    }
  };

  uploadImage = async imgDir => {
    // 이미지가 있다면,
    if (this.state.image) {
      // fetch(): 서버 API를 호출하여 데이터를 받아올 때 사용
      const response = await fetch(this.state.image); // 불러온 사진의 uri 값. 즉 로컬 이미지 경로가 들어와있음
      // blob(): JSON 파일의 담을 수 있는 텍스트가 아닌, 이미지나 동영상 같은 대용량 라이브러리를 데이터를 담는 그릇이라고 생각하면 됨
      // 즉, 이미지를 서버에 저장할 수 있는 형식으로 변환해주는 역할
      const blob = await response.blob();

      try {
        await storage
          .ref(imgDir)
          .put(blob)
          .then(() => {
            this.setState({
              isLoading: false,
            });
            this.props.navigation.push('Cal');
          });
      } catch (err) {
        this.setState({
          isLoading: false,
        });
        alert('저장 실패: ' + err.message);
      }
    } else {
      this.setState({
        isLoading: false,
      });
      // navigate(): 이전 단계로 스택을 이동
      // push(): 스택 최상의 루트로 이동.  새롭게 렌더링된 화면을 보여줌
      this.props.navigation.push('Cal');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        // 안드로이드는 이 기능을 사용하지 말라해서 null 값을 줌
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.indexView}>
              <Text style={styles.indexText}># {this.state.index + 1}</Text>
            </View>
            <View style={styles.dateView}>
              <Text style={styles.dateText}>Date: &nbsp;</Text>
              <View style={styles.dateInputView}>
                {this.state.newCal ? (
                  <TextInput
                    value={this.state.calData.date}
                    style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
                    placeholder="날짜"
                    placeholderTextColor="#777"
                    onChangeText={value => this.onChangeInput('date', value)}
                    editable={true}
                  />
                ) : (
                  // 새로운 다이어리 작성이 아닌 경우,
                  <TextInput
                    value={this.state.calData.date}
                    style={{
                      fontSize: 20,
                      paddingTop: 0,
                      paddingBottom: 0,
                      color: 'gray',
                    }}
                    editable={false}
                  />
                )}
              </View>
            </View>
            <View style={styles.dateView}>
              <Text style={styles.dateText}>Title: &nbsp;</Text>
              <View style={styles.dateInputView}>
                {this.state.newCal ? (
                  <TextInput
                    value={this.state.calData.title}
                    style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
                    placeholder="제목"
                    placeholderTextColor="#777"
                    onChangeText={value => this.onChangeInput('title', value)}
                    editable={true}
                  />
                ) : (
                  // 새로운 다이어리 작성이 아닌 경우,
                  <TextInput
                    value={this.state.calData.title}
                    style={{
                      fontSize: 20,
                      paddingTop: 0,
                      paddingBottom: 0,
                      color: 'gray',
                    }}
                    editable={false}
                  />
                )}
              </View>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.dateText}>Description: &nbsp;</Text>
              <View style={[styles.dateInputView, styles.descriptionInputView]}>
                <ScrollView>
                  {this.state.newCal ? (
                    <TextInput
                      value={this.state.calData.description}
                      style={{fontSize: 20, paddingTop: 0, paddingBottom: 0}}
                      placeholder="내용"
                      placeholderTextColor="#777"
                      onChangeText={value =>
                        this.onChangeInput('description', value)
                      }
                      editable={true}
                      multiline={true}
                    />
                  ) : (
                    // 새로운 다이어리 작성이 아닌 경우,
                    <TextInput
                      value={this.state.calData.description}
                      style={{
                        fontSize: 20,
                        paddingTop: 0,
                        paddingBottom: 0,
                        color: 'gray',
                      }}
                      editable={false}
                      multiline={true}
                    />
                  )}
                </ScrollView>
              </View>
            </View>
            <View style={styles.imageView}>
              <View style={{flex: 10, paddingRight: 15}}>
                <Text style={styles.dateText}>Image: &nbsp;</Text>
                <View style={[styles.dateInputView, styles.imageDisplayView]}>
                  {this.state.calData.imagePath ? (
                    <Image
                      source={{uri: this.state.image}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </View>
              <View style={{flex: 1, paddingTop: 30, paddingRight: 10}}>
                {this.state.newCal ? (
                  <TouchableOpacity onPress={() => this.selectImage()}>
                    <Image
                      source={require('../../assets/images/photo.png')}
                      resizeMode="contain"
                      style={{
                        height: 30,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require('../../assets/images/photo.png')}
                    resizeMode="contain"
                    style={{
                      height: 30,
                      width: 30,
                      opacity: 0.2,
                    }}
                  />
                )}
              </View>
            </View>
            <View style={styles.buttonView}>
              {!this.state.newCal ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={{fontSize: 15, padding: 5}}
                    onPress={() => this.deleteData()}>
                    <Text>삭제</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {!this.state.newCal ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={{fontSize: 15, padding: 5}}
                    onPress={() => this.updateData()}>
                    <Text>수정</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{fontSize: 15, padding: 5}}
                  onPress={() => this.createData()}>
                  <Text>완료</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Spinner
              visible={this.state.isLoading}
              textContent={'캘린더 업로드..ing...'}
              overlayColor={'rgba(0,0,0,0.6)'}
              textStyle={{color: '#fff'}}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#eee',
    height: '100%',
  },
  indexView: {
    flex: 1,
    paddingLeft: 15,
    marginTop: 10,
  },
  indexText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  dateView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dateText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dateInputView: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderRadius: 1,
  },
  descriptionView: {
    flex: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  descriptionInputView: {
    flex: 0.95,
    marginTop: 5,
  },
  imageView: {
    flex: 4,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  imageDisplayView: {
    flex: 0.9,
    marginTop: 5,
  },
  buttonView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 15,
  },
  buttonContainer: {
    width: 80,
    height: 30,
    marginLeft: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalEdit;
