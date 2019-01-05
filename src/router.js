import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

/* import RecommendList from './pages/recommend/recommend'
import RankList from './pages/rank/rank'
import Search from './pages/search/search'
import Player from './components/player/player' */

export default function({ history, app }) {
  const RecommendList = dynamic({
    app,
    component: () => import('./pages/recommend/recommend')
  })
  const RankList = dynamic({
    app,
    component: () => import('./pages/rank/rank')
  })
  const Search = dynamic({
    app,
    component: () => import('./pages/search/search')
  })
  const Player = dynamic({
    app,
    component: () => import('./components/player/player')
  })
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={RecommendList} />
        <Route exact path="/rank" component={RankList} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/player" component={Player} />
      </Switch>
    </Router>
  )
}
