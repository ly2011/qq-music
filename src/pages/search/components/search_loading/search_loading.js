import React, { Fragment } from 'react'

import styles from './search_loading.module.scss'
const SearchLoading = ({ message = '', children = null }) => (
  <div className={styles['search_loading']}>
    {children && !message && children}
    {message && !children && (
      <Fragment>
        <i className={styles['icon_loading']} />
        <div className={styles['loading_text']}>{message}</div>
      </Fragment>
    )}
  </div>
)

export default SearchLoading
