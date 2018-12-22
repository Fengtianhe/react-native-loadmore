import React from 'react'
import {RefreshControl, ScrollView, View} from "react-native";
import LoadingMore from "./lib/LoadingMore";

const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');


const LoadMore = createReactClass({
	propTypes: {
		renderList: PropTypes.any.isRequired,
		onClickLoadMore: PropTypes.func,
		onRefresh: PropTypes.func.isRequired,
		isLastPage: PropTypes.bool.isRequired,
		loadMoreType: PropTypes.oneOf(['click', 'scroll']),
		onLoadMore: PropTypes.func
		// isRefreshing: React.PropTypes.bool,
		// isNeedRefresh: React.PropTypes.bool,
	},
	getDefaultProps() {
		return {
			isRefreshing: false,
			isNeedRefresh: true,
			isLastPage: false,
			loadMoreType: 'click'
		}
	},

	/**
	 * scrollview滑动的时候
	 * @private
	 */
	_onScroll(event) {
		if (this.props.isLastPage || this.props.loadMoreType !== 'scroll') {
			return;
		}
		let y = event.nativeEvent.contentOffset.y;
		let height = event.nativeEvent.layoutMeasurement.height;
		let contentHeight = event.nativeEvent.contentSize.height;
		// console.log('offsetY-->' + y);
		// console.log('height-->' + height);
		// console.log('contentHeight-->' + contentHeight);
    if (y + height >= contentHeight && this.props.onLoadMore) {
      // this.props.onLoadMore && this.props.onLoadMore()
      return (
        <LoadingMore
          onLoading={() => {
            this.props.onLoadMore()
          }}
        />
      );
		}
	},

	/**
	 * 显示上啦加载view
	 * @private
	 */
	_renderLoadMore() {
		if (this.props.isLastPage) {
			return;
		}
		return (
			<LoadingMore
				onLoading={() => {
					this.props.onClickLoadMore && this.props.onClickLoadMore()
				}}
			/>
		);
	},

	render() {
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={this.props.isRefreshing}
						onRefresh={() => {
							this.props.onRefresh && this.props.onRefresh()
						}}
						tintColor="#000"
						title="下拉刷新"
						titleColor="#000"
						colors={['#ff0000', '#00ff00', '#0000ff']}
						progressBackgroundColor="#ffffff"
					/>
				}
				onScroll={nativeEvent => this._onScroll(nativeEvent)}
				scrollEventThrottle={80}
			>
				{this.props.renderList}
				{/*尾部上拉加载更多view*/}
				{this.props.loadMoreType == 'click' ? this._renderLoadMore() : (<View/>)}
			</ScrollView>
		)
	}
})
module.exports = LoadMore