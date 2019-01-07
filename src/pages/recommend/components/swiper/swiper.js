import React from 'react'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import styles from './swiper.module.scss'

const Swiper = ({ slider }) => {
  if (slider) {
    return (
      <Carousel showThumbs={false} showStatus={false} dynamicHeight={true}>
        {slider.map(item => (
          <div key={item.id} className={styles['slider_item']}>
            {/* <LazyLoad height={200}> */}
            <img src={item.picUrl} alt="" />
            {/* </LazyLoad> */}
          </div>
        ))}
      </Carousel>
    )
  }
  return null
}

export default Swiper
