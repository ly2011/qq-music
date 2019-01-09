import React, { PureComponent } from 'react'

import TopBar from './components/top_bar/top_bar'
import Album from './components/album/album'

import albumData from '../../mock/album.json'

import brandLogo from '../../assets/images/logo.svg'
import styles from './taoge.module.scss'

class Taoge extends PureComponent {
  state = {
    songInfo: {},
    isOpenSongInfoIntro: true // 是否已展开专辑简介
  }
  componentDidMount() {
    // console.log(this.props.location.query)
    // console.log(this.props.location.state)
    // console.log(this.props.match.params)
    const firstObj = Object.values(albumData)[0]
    this.setState({
      songInfo: firstObj
    })
  }
  changeSongInfoIntroSwitch = () => {
    this.setState({
      isOpenSongInfoIntro: !this.state.isOpenSongInfoIntro
    })
  }
  render() {
    const { songInfo, isOpenSongInfoIntro } = this.state
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
                <span className={styles['count_box__number']}>共{songInfo.total_song_num}首</span>
              </div>
              <a href="javascript:;" className={styles['collect']}>
                收藏
                <i className={styles['collect__icon']} />
              </a>
            </div>

            {songInfo && songInfo.list && (
              <ul className={styles['song_list']}>
                {songInfo.list.map((song, index) => (
                  <li className={styles['song_item']} key={song.songid}>
                    <div className={styles['song_list__order']}>
                      <span className={styles['song_list__decimal']}>{index + 1}</span>
                    </div>
                    <div className={styles['song_list__bd']}>
                      <div className={styles['song_list__box']}>
                        <h3 className={styles['song_list__tit']}>
                          <span className={styles['song_list__txt']}>{song.songname}</span>
                        </h3>
                        <p className={styles['song_list__desc']}>
                          <span className={styles['song_list__txt']}>
                            {song.singer && song.singer.map(singer => singer.name).join('/')} . {song.albumdesc}
                          </span>
                        </p>
                      </div>
                      <div className={styles['song_list__more']}>
                        <i className={styles['song_list__dot']} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles['check_more']}>点击加载更多歌曲</div>
            <div className={styles['song_info_tit']}>
              <div className={styles['song_info_tit__txt']}>专辑简介</div>
            </div>
            <div
              className={`${styles['song_info_intro']} ${
                styles[isOpenSongInfoIntro ? null : 'song_info_intro--unfold']
              }`}
            >
              <div className={styles['song_info_intro__para']} dangerouslySetInnerHTML={{ __html: songInfo.desc }} />
              <div
                className={`${styles['song_info_intro_switch']} ${
                  styles[isOpenSongInfoIntro ? 'song_info_intro_switch--open' : 'song_info_intro_switch--close']
                }`}
                onClick={this.changeSongInfoIntroSwitch}
              >
                {isOpenSongInfoIntro ? '展开' : '收起'}
              </div>
            </div>
            <div className={styles.brand}>
              <img className={styles['brand__logo']} src={brandLogo} alt="" />
              <p className={styles['brand__name']}>QQ音乐</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Taoge
