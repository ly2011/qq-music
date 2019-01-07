import React, { PureComponent, Suspense, lazy } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import LazyLoad from 'react-lazyload'

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

            {/* <div className={styles['radios']}>
              {radioList && <h2 className={styles['list_title']}>电台</h2>}
              <ul className={styles['list_container']}>
                {radioList &&
                  radioList.map(item => (
                    <li className={styles['js_play_radio']} key={item.radioid}>
                      <a href="javascript:;" className={styles['list_main']}>
                        <div className={styles['list_media']}>
                          <LazyLoad height={200}>
                            <img className={styles['list_pic']} src={item.picUrl} alt="" />
                          </LazyLoad>
                          <span className={`${styles['icon']} ${styles['icon_play']}`} />
                        </div>
                        <div className={styles['list_info']}>
                          <h3 className={styles['list_tit']}>{item.Ftitle}</h3>
                        </div>
                      </a>
                    </li>
                  ))}
              </ul>
            </div> */}

            {/*             <div className={styles['playlists']}>
              {songList && <h2 className={styles['list_title']}>热门歌曲</h2>}
              <ul className={styles['list_container']}>
                {songList &&
                  songList.map(item => (
                    <li className={styles['js_play_radio']} key={item.id}>
                      <a href="javascript:;" className={styles['list_main']} onClick={() => this.toTaogePage(item.id)}>
                        <div className={styles['list_media']}>
                          <LazyLoad height={200}>
                            <img className={styles['list_pic']} src={item.picUrl} alt="" />
                          </LazyLoad>
                          <span className={styles['listen_count']}>
                            <i className={`${styles['icon_listen']}`} />
                            {dealNum(item.accessnum)}
                          </span>
                          <span className={`${styles['icon']} ${styles['icon_play']}`} />
                        </div>
                        <div className={styles['list_info']}>
                          <h3 className={[styles['list_tit']]}>{item.songListDesc}</h3>
                          <p className={styles['list_text']}>{item.songListAuthor}</p>
                        </div>
                      </a>
                    </li>
                  ))}
              </ul>
            </div> */}
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
