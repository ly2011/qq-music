import React from 'react'
import { Link } from 'dva/router'

import styles from './not_found.module.scss'
const NotFound = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      抱歉，找不到该页面！
      <Link to="/">回到首页</Link>
    </div>
  </div>
)

export default NotFound
