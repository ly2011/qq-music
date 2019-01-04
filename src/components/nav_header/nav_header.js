import React, { PureComponent } from 'react'
import { Link, withRouter } from 'dva/router'
// import logo from '../logo.svg'
import styles from './nav_header.module.scss'

class NavHeader extends PureComponent {
  navConfig = [
    {
      name: '推荐',
      key: 0,
      href: '/'
    },
    {
      name: '排行榜',
      key: 1,
      href: '/rank'
    },
    {
      name: '搜索',
      key: 2,
      href: '/search'
    }
  ]
  render() {
    const { pathname } = this.props.location
    return (
      <div>
        <header className={styles.header}>
          {/* <img src={logo} alt="qq音乐" /> */}
          <i className={styles.logo}>QQ音乐</i>
          <span className={styles['btn_download']}>下载APP</span>
        </header>

        <nav className={styles.navbar}>
          <ul className={styles['nav-list']}>
            {this.navConfig.map(item => (
              <li className={styles['nav-item']} key={item.key}>
                <Link to={item.href} className={item.href === pathname ? 'active' : null}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(NavHeader)
