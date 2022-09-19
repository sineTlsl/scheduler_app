/* TodoList 작성을 위한 화면 구성 JS파일 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';

class CalEdit extends Component {
  constructor(props) {
    super(props);
    const params = props.route.params;

    !params.newCal
      ? (this.state = {
          newCal: false,
          index: params.index,
          calData: {
            id: params.calData.data.id,
            date: params.calData.data.date,
            title: params.calData.data.title,
            description: params.calData.data.description,
            imagePath: params.calData.data.imagePath,
          },
        })
      : (this.state = {
          newCal: true,
          index: params.index,
          calData: {
            id: params.id,
            date: '',
            title: '',
            description: '',
            imagePath: '',
          },
        });
    console.warn(this.state);
  }

  onChangeInput = (item, value) => {
    if (item === 'date') {
      this.setState(prevState => ({
        calData: {
          ...prevState.Cals,
          date: value,
        },
      }));
    } else if (item === 'title') {
      this.setState(prevState => ({
        calData: {
          ...prevState.Cals,
          title: value,
        },
      }));
    } else if (item === 'description') {
      this.setState(prevState => ({
        calData: {
          ...prevState.Cals,
          description: value,
        },
      }));
    }
  };

  render() {
    return (
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
                  color: 'grey',
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
                  color: 'grey',
                }}
                editable={false}
              />
            )}
          </View>
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.dateText}>Description: &nbsp;</Text>
          <View style={(styles.dateInputView, styles.descriptionInputView)}>
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
                    color: 'grey',
                  }}
                  editable={false}
                  multiline={true}
                />
              )}
            </ScrollView>
          </View>
        </View>
        <View style={{flex: 4, borderWidth: 0.5}}>
          <Text>Image</Text>
        </View>
        <View style={{flex: 1.5, borderWidth: 0.5}}>
          <Text>Button</Text>
        </View>
      </View>
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
});

export default CalEdit;
