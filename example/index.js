import React from 'react'
import {RefreshControl, ScrollView, Text, View} from "react-native";
import LoadMore from "../dist";

export default class BalanceAccountDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            pageNum: 0,
            pageSize: 10,
            isLastPage: false,
            data: []
        }
    }


    componentDidMount () {
        this._fetchData(1)
    }


    /**
     * 这里是请求数据
     * this is a function for request data from api
     * @private
     */
    _fetchData () {

    }

    _onRefresh () {
        this.setState({data: []})
        this._fetchData(1)
    }

    _onLoadMore () {
        const pageNum = this.state.pageNum
        this._fetchData(pageNum + 1)
    }

    _renderList () {
        const data = this.state.data
        const item = []
        for (let i in data) {
            item.push(<View key={i} style={{
                backgroundColor: 'yellow',
                borderBottomWidth: 1,
                borderColor: '#000',
                height: 30
            }}><Text>{data[i].flowId}</Text></View>)
        }
        return item
    }

    render () {
        return (
            <View>
                <LoadMore
                    renderList={this._renderList()}
                    onClickLoadMore={() => {
                        this._onLoadMore()
                    }}
                    onRefresh={() => {
                        console.log(1)
                        this._onRefresh()
                    }}
                    isLastPage={this.state.isLastPage}
                />
            </View>
        )
    }
}