import React from 'react'

import styles from './album.module.scss'

const Album = ({ song }) => (
  <div className={styles['album']}>
    <div className={styles['album__media']}>
      <img
        className={styles['album__cover']}
        src="https://p.qpic.cn/music_cover/1Fr9IFMhWDPeUzWKVEjn3QTL2eX2QziaJmaL0ZAmsvtW71ic9IDUoYzg/600?n=1"
        onError={e => {
          e.target.onerror = null
          e.target.src = '//y.gtimg.cn/mediastyle/global/img/playlist_150.png?max_age=2592000'
        }}
        alt="催泪大杀器！盘点演唱会经典万人大合唱"
      />
    </div>
    <div className={styles['album__bd']}>
      <h1 className={styles['album__name']}>催泪大杀器！盘点演唱会经典万人大合唱</h1>
      <div className={styles['author']}>
        <img
          className={styles['author__avatar']}
          src="https://thirdqq.qlogo.cn/g?b=sdk&k=0FNFoIZ4m3m4nFnxbUxY7w&s=100&t=549"
          onError={e => {
            e.target.onerror = null
            e.target.src = '//y.gtimg.cn/mediastyle/global/img/playlist_150.png?max_age=2592000'
          }}
          alt=""
        />
        <div className={styles['author__bd']}>
          <span className={styles['author__name']}>Harry</span>
        </div>
      </div>

      <p className={styles['album__desc']}>播放量：986.4万</p>
    </div>
  </div>
)

export default Album
