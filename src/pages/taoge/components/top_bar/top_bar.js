import React from 'react'

import logo from '../../../../assets/images/logo.svg'

import styles from './top_bar.module.scss'

const TopBar = () => (
  <div className={styles['top_bar']}>
    <img className={styles['top_bar__img']} src={logo} alt="" />
    <div className={styles['top_bar__bd']}>
      <h6 className={styles['top_bar__tit']}></h6>
      <p className={styles['top_bar__desc']}></p>
    </div>
    <a href="javascript:;" className={styles['top_bar__btn']}>
      打开
    </a>
  </div>
)

export default TopBar