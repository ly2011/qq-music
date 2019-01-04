import React from 'react'

import styles from './album.module.scss'

const Album = ({song}) => (
  <div className={styles['album']}>
    <div className={styles['album__media']}>
      <img className={styles['album__cover']} src={song} alt=""/>
    </div>
    <div className={styles['album__bd']}>
      <h1 className={styles['album__name']}></h1>
      <div className={styles['author']}>
        <img className={styles['author_avatar']} src={song} alt=""/>
        <div className={styles['author_bd']}>
          <span className={styles['author_name']}></span>
        </div>
      </div>

      <p className={styles['album__desc']}>播放量：</p>
    </div>
  </div>
)

export default Album