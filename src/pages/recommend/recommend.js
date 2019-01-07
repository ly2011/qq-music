import React, { PureComponent, Suspense, lazy } from 'react'
import { connect } from 'dva'

import { getRecommendList } from '../../services/getData'

// 加载公共组件
import NavHeader from '../../components/nav_header/nav_header'
import Loading from '../../components/loading/loading'
import LazyLoading from '../../components/lazy_loading/lazy_loading'

import styles from './recommend.module.scss'

// const sleep = ms => new Promise(r => setTimeout(r, ms))
// 懒加载自身的业务组件
const Swiper = lazy(async () => {
  return import('./components/swiper/swiper')
})
const RadioList = lazy(async () => {
  return import('./components/radio_list/radio_list')
})
const PlayLists = lazy(async () => {
  return import('./components/playlists/playlists')
})

class RecommendList extends PureComponent {
  state = {
    radioList: null,
    songList: null,
    slider: null,
    isLoading: true
  }
  componentDidMount() {
    this.getRecommendList()
  }
  getRecommendList() {
    // 获取推荐页的数据
    getRecommendList()
      .then(res => {
        const { radioList, songList, slider } = res.data
        this.setState({
          radioList,
          songList,
          slider,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })
  }
  // 显示 player 信息
  toTaogePage = songid => {
    this.props.history.push({ pathname: `/taoge/${songid}`, query: { songid }, state: { songid }, songid })
  }

  render() {
    const { isLoading, slider, radioList, songList } = this.state
    return (
      <div className={styles['content_wrapper']}>
        <NavHeader />

        {!isLoading && (
          <div className={styles['content']}>
            <Suspense fallback={<LazyLoading />}>
              <Swiper slider={slider} />
              <RadioList radioList={radioList} />
              <PlayLists songList={songList} toTaogePage={this.toTaogePage} />
            </Suspense>
          </div>
        )}

        {isLoading && <Loading />}
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {}
}
function mapDispatchToProps(dispatch) {
  return {
    getSong: song => {
      dispatch({ type: 'app/getSong', payload: song })
    },
    showPlayer: () => {
      dispatch({ type: 'app/showPlayer' })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendList)
