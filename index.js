import React from 'react'
import {RefreshControl, ScrollView, View} from "react-native";
import LoadingMore from "./lib/LoadingMore";
import PropTypes from 'prop-types'
import * as ScreenUtils from './lib/ScreenUtil';

export default class LoadMore extends React.Component {
  static propTypes = {
    renderList: PropTypes.any.isRequired,
    onClickLoadMore: PropTypes.func,
    onRefresh: PropTypes.func.isRequired,
    isLastPage: PropTypes.bool.isRequired,
    loadMoreType: PropTypes.oneOf(['click', 'scroll']),
    onLoadMore: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
    indicatorText: PropTypes.string,
    loadMoreBtnText: PropTypes.string,
  }
  //
  static defaultProps = {
    isRefreshing: false,
    isNeedRefresh: true,
    isLastPage: false,
    loadMoreType: 'click',
    indicatorText: '正在加载 ...',
    loadMoreBtnText: '点击加载更多 ...'
  }
  
  /**
   * scrollview滑动的时候
   * @private
   */
  _onScroll (event) {
    if (this.props.isLastPage || this.props.loadMoreType !== 'scroll') {
      return;
    }
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    // console.log('offsetY-->' + y);
    // console.log('height-->' + height);
    // console.log('contentHeight-->' + contentHeight);
    
    if (y + height >= contentHeight && !this.props.isLoading) {
      this.props.onLoadMore && this.props.onLoadMore()
    }
  }
  
  /**
   * 显示上啦加载view
   * @private
   */
  _renderLoadMore () {
    if (this.props.isLastPage) {
      return;
    }
    return (
      <LoadingMore
        isLoading={this.props.isLoading}
        onLoading={() => {
          this.props.onClickLoadMore && this.props.onClickLoadMore()
        }}
        showClickLoadmoreBtn={this.props.loadMoreType === 'click'}
        indicatorText={this.props.indicatorText}
        loadMoreBtnText={this.props.loadMoreBtnText}
      />
    );
  }
  
  render () {
    return (
      <ScrollView
        ref={'scrollView'}
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
        {this._renderLoadMore()}
      </ScrollView>
    )
  }
}