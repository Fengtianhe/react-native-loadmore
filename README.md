# react-native-loadmore
RN 列表下拉刷新，上拉加载更多
***

![](./loadmore.gif)

## Install

	npm install react-native-loadmore
	
or
	
	yarn add react-native-loadmore	

## Params

|key|type|required|default|desc|
|---- |---- |---- |---- |---- |
|renderList|React Element|true||loadmore中显示的列表|
|loadMoreType|String|false|'click'|下拉加载的形式['click','scroll']|
|renderList|React Element|true||loadmore中显示的列表|
|onClickLoadMore|function|false||点击加载更多回调 when loadMoreType = 'click'|
|onLoadMore|function|false||点击加载更多回调 when loadMoreType = 'scroll'|
|onRefresh|function|false||下拉刷新调用|
|isLastPage|bool|false|false|是否是最后一页，用于是否显示加载更多|