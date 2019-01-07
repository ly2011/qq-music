import React from 'react'
import LazyLoad from 'react-lazyload'

import { dealNum } from '../../../../utils/filter'

import styles from '../../recommend.module.scss'

const PlayLists = ({ songList, toTaogePage }) => {
  if (songList) {
    return (
      <div className={styles['playlists']}>
        {songList && <h2 className={styles['list_title']}>热门歌曲</h2>}
        <ul className={styles['list_container']}>
          {songList &&
            songList.map(item => (
              <li className={styles['js_play_radio']} key={item.id}>
                <a href="javascript:;" className={styles['list_main']} onClick={() => toTaogePage(item.id)}>
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
                    <h3 className={styles['list_tit']}>{item.songListDesc}</h3>
                    <p className={styles['list_text']}>{item.songListAuthor}</p>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
    )
  } else {
    return null
  }
}
export default PlayLists
