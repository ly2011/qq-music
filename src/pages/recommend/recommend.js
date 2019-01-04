import React, {PureComponent} from 'react'
// import SwipeableViews from 'react-swipeable-views';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';


import {getRecommendList} from '../../services/getData'
import {dealNum} from '../../utils/filter'

import NavHeader from '../../components/nav_header/nav_header'
import Loading from '../../components/loading/loading'

import styles from './recommend.module.scss'

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
    getRecommendList().then(res => {
      const {radioList, songList, slider} = res.data
      this.setState({
        radioList,
        songList,
        slider,
        isLoading: false
      })
    }).catch(err => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    const { isLoading, slider, radioList, songList} = this.state
    return (
      <div className={styles['content_wrapper']}>
        <NavHeader />

        {!isLoading && <div className={styles['content']}>
          {slider && <Carousel showThumbs={false} showStatus={false} dynamicHeight={true}>
            {slider.map(item =>
              <div key={item.id} className={styles['slider_item']}>
                <img src={item.picUrl} alt=""/>
              </div>
            )}
          </Carousel>}

          <div className={[styles['radios']]}>
            {radioList && <h2 className={styles['list_title']}>电台</h2>}
            <ul className={styles['list_container']}>
              {radioList && radioList.map(item => <li className={styles['js_play_radio']} key={item.radioid}>
                <a href="javascript:;" className={styles['list_main']}>
                  <div className={styles['list_media']}>
                    <img className={styles['list_pic']} src={item.picUrl}  alt=""/>
                    <span className={`${styles['icon']} ${styles['icon_play']}`}></span>
                  </div>
                  <div className={styles['list_info']}>
                    <h3 className={[styles['list_tit'] ]}>{item.Ftitle}</h3>
                  </div>
                </a></li>)}
            </ul>
          </div>

          <div className={styles['playlists']}>
            {songList && <h2 className={styles['list_title']}>热门歌曲</h2>}
            <ul className={styles['list_container']}>
              {songList && songList.map(item => <li className={styles['js_play_radio']} key={item.id}>
                <a href="javascript:;" className={styles['list_main']}>
                  <div className={styles['list_media']}>
                    <img className={styles['list_pic']} src={item.picUrl} alt="" />
                    <span className={styles['listen_count']}>
                      <i className={`${styles['icon_listen']}`}></i>
                      {dealNum(item.accessnum)}
                    </span>
                    <span className={`${styles['icon']} ${styles['icon_play']}`}></span>
                  </div>
                  <div className={styles['list_info']}>
                    <h3 className={[styles['list_tit']]}>{item.songListDesc}</h3>
                    <p className={styles['list_text']}>{item.songListAuthor}</p>
                  </div>
                </a></li>)}
            </ul>
          </div>
        </div>}

        {isLoading && <Loading /> }
      </div>
    )
  }
}

export default RecommendList