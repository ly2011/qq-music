import React, { PureComponent } from 'react'
import LazyLoad from 'react-lazyload'

import { getRankList } from '../../services/getData'
import { dealNum } from '../../utils/filter'

import Loading from '../../components/loading/loading'

import styles from './rank.module.scss'

class RankList extends PureComponent {
  state = {
    rankList: null,
    isLoading: true
  }
  componentDidMount() {
    this.getRankList()
  }
  getRankList() {
    // 获取排行榜页的数据
    getRankList()
      .then(res => {
        const rankList = res.data.topList
        this.setState({
          rankList,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { rankList, isLoading } = this.state
    return (
      <div className={styles['toplist_wrap']}>
        {!isLoading && (
          <div className={styles['content']}>
            <ul className={styles.toplist}>
              {rankList &&
                rankList.map(item => (
                  <li className={styles['topic_item']} key={item.id}>
                    <div className={styles['topic_main']}>
                      <a href="javascript:;" role="button" className={styles['topic_media']}>
                        <LazyLoad height={200}>
                          <img src={item.picUrl} alt="" />
                        </LazyLoad>
                        <span className={styles['listen_count']}>
                          <i className={styles['icon_listen']} />
                          {dealNum(item.listenCount)}
                        </span>
                      </a>

                      <div className={styles['topic_info']}>
                        <div className={styles['topic_cont']}>
                          <h3 className={styles['topic_tit']}>{item.topTitle}</h3>
                          {item.songList &&
                            item.songList.map((song, songIndex) => (
                              <p key={songIndex}>
                                {songIndex + 1}
                                <span className={styles['text_name']}>{song.songname}</span>- {song.singername}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <p className={styles['topic_more']}>
              <a href="javascript:;">去客户端发现更多好音乐 &gt;</a>
            </p>
          </div>
        )}

        {isLoading && <Loading />}
      </div>
    )
  }
}

export default RankList
