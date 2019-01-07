import React from 'react'
import LazyLoad from 'react-lazyload'

import styles from '../../recommend.module.scss'

const RadioList = ({ radioList }) => {
  if (radioList) {
    return (
      <div className={styles['radios']}>
        <h2 className={styles['list_title']}>电台</h2>
        <ul className={styles['list_container']}>
          {radioList.map(item => (
            <li className={styles['js_play_radio']} key={item.radioid}>
              <a href="javascript:;" className={styles['list_main']}>
                <div className={styles['list_media']}>
                  {/* <LazyLoad height={200}> */}
                  <img className={styles['list_pic']} src={item.picUrl} alt="" />
                  {/* </LazyLoad> */}
                  <span className={`${styles['icon']} ${styles['icon_play']}`} />
                </div>
                <div className={styles['list_info']}>
                  <h3 className={styles['list_tit']}>{item.Ftitle}</h3>
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

export default RadioList
