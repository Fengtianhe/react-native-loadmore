import React, {Component} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import * as ScreenUtils from './ScreenUtil';
import PropTypes from 'prop-types'

export default class LoadingMore extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    indicatorText: PropTypes.string,
    loadMoreBtnText: PropTypes.string,
  }
  
  static propTypes = {
    isLoading: false,
    indicatorText: '正在加载 ...',
    loadMoreBtnText: '点击加载更多 ...'
  }
  
  renderIndicator () {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          padding: ScreenUtils.scaleSize(10)
        }}>
        <ActivityIndicator
          size={'small'}
          color={'#000'}
          animating={true}
          style={{width: ScreenUtils.scaleSize(15), height: ScreenUtils.scaleSize(15)}}
        />
        <Text style={{
          color: '#000',
          fontSize: 14,
          marginLeft: ScreenUtils.scaleSize(15)
        }}>
          {this.props.indicatorText}
        </Text>
      </View>
    );
  }
  
  renderLoadmoreBtn () {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            isLoading: true
          });
          this.props.onLoading && this.props.onLoading()
        }}
      >
        <Text
          style={{
            color: '#000',
            fontSize: 14,
            alignSelf: 'center',
            padding: ScreenUtils.scaleSize(10)
          }}>
          {this.props.loadMoreBtnText}
        </Text>
      </TouchableOpacity>
    );
  }
  
  render () {
    if (this.state.isLoading) {
      return this.renderIndicator()
    } else if (this.props.onLoading && this.props.showClickLoadmoreBtn) {
      return this.renderLoadmoreBtn()
    }
    
    return <View/>
  }
  
  componentWillReceiveProps (nextProps) {
    this.setState({
      isLoading: nextProps.isLoading
    });
  }
}