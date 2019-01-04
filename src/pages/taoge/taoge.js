import React, {PureComponent} from 'react'

import TopBar from './components/top_bar/top_bar'
import Album from './components/album/album'

import styles from './taoge.module.scss'

class Taoge extends PureComponent {
  render() {
    return (
      <div className={styles['taoge']}>
        <TopBar />
        <Album song={null} />
      </div>
    )
  }
}

export default Taoge