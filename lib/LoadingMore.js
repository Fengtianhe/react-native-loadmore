import React, {Component} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import * as ScreenUtils from './ScreenUtil';

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');

const LoadingMore = createReactClass({
	getDefaultProps() {
		return {
			isLoading: false
		}
	},
	getInitialState() {
		return {
			isLoading: this.props.isLoading
		}
	},
	render() {
		if (this.state.isLoading) {
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
						正在加载 ...
					</Text>
				</View>
			);
		} else if (this.props.onLoading) {
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
						点击加载更多 ...
					</Text>
				</TouchableOpacity>
			);
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			isLoading: nextProps.isLoading
		});
	}
})

module.exports = LoadingMore;