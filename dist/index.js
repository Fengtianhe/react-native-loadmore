import React from "react";
import {RefreshControl, ScrollView} from "react-native";
import LoadingMore from "./lib/LoadingMore";

export default class LoadMore extends React.Component {
    static defaultProps = {
        isRefreshing: false,
        isNeedRefresh: true,
        isLastPage: false
    }
    static propTypes: {
        renderList: React.PropTypes.element.isRequired,
        onClickLoadMore: React.PropTypes.func,
        onRefresh: React.PropTypes.func,
        // isRefreshing: React.PropTypes.bool,
        // isNeedRefresh: React.PropTypes.bool,
        isLastPage: React.PropTypes.bool
    }

    /**
     * scrollview滑动的时候
     * @private
     */
    _onScroll (event) {
        if (!this.props.isNeedRefresh) {
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        // console.log('offsetY-->' + y);
        // console.log('height-->' + height);
        // console.log('contentHeight-->' + contentHeight);
        if (y + height >= contentHeight) {
            this.props.onRefresh && this.props.onRefresh()
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
                onLoading={() => {
                    this.props.onClickLoadMore && this.props.onClickLoadMore()
                }}
            />
        );
    }

    render () {
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
                // onScroll={this._onScroll.bind(this)}
                scrollEventThrottle={80}
            >
                {this.props.renderList}
                {/*尾部上拉加载更多view*/}
                {this._renderLoadMore()}
            </ScrollView>
        )
    }
}