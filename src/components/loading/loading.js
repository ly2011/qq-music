import React from 'react'

import styles from './loading.module.scss'
import loadingImg from '../../assets/images/loading.gif'

const Loading = () => {
  return <div className={styles.loading}>
    <img src={loadingImg} alt="loading"/>
    <p>页面正在努力加载中<span>...</span></p>
  </div>
}

export default Loading
