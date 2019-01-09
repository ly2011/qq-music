import React, { PureComponent } from 'react'
import { Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'

// 加载公共组件
import NavHeader from '../../components/nav_header/nav_header'

const RecommendList = dynamic({
  component: () => import('../../pages/recommend/recommend')
})
const RankList = dynamic({
  component: () => import('../../pages/rank/rank')
})
const Search = dynamic({
  component: () => import('../../pages/search/search')
})
class DashBoard extends PureComponent {
  render() {
    // const { location, history } = this.props

    return (
      <div>
        <NavHeader />
        <Switch>
          <Route exact path="/" component={RecommendList} />
          <Route exact path="/rank" component={RankList} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    )
  }
}

export default DashBoard
