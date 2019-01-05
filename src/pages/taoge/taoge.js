import React, { PureComponent } from 'react'

import TopBar from './components/top_bar/top_bar'
import Album from './components/album/album'

import styles from './taoge.module.scss'

class Taoge extends PureComponent {
  componentDidMount() {
    console.log(this.props.location.query)
    console.log(this.props.location.state)
    console.log(this.props.match.params)
  }
  render() {
    return (
      <div className={styles['taoge']}>
        <div className={styles['info_box']}>
          <div className={styles['info_box__bd']}>
            <TopBar />
            <Album song={null} />
            <div className={styles['opt_box']}>
              <a href="javascript:;" className={styles['btn_play_all']}>
                播放全部
              </a>
            </div>

            <img
              src="https://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/600?n=1"
              onError={e => {
                e.target.onerror = null
                e.target.src = '//y.gtimg.cn/mediastyle/global/img/playlist_150.png?max_age=2592000'
              }}
              className={styles['info_box__bg']}
            />
          </div>
        </div>

        <div className={styles['wrap']}>
          <div className={styles['main']}>
            <div className={styles['count_box']}>
              <div className={styles['count_box__desc']}>
                歌单
                <span className={styles['count_box__number']}>共66首</span>
              </div>
              <a href="javascript:;" className={styles['collect']}>
                收藏
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Taoge
