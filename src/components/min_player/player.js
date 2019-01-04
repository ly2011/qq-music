import React, {PureComponent} from 'react'

import styles from './player.module.scss'

class Player extends PureComponent {
  render() {
    return (
      <div className={styles['player_wrap']}>
        <div className={styles['play_bar']}>
          <a href="javascript:;">
            <div className={styles['play_bar__aside']}>

            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default Player