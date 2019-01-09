import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { getHotList, getSearchList } from '../../services/getData'

import Loading from '../../components/loading/loading'
import SearchLoading from './components/search_loading/search_loading'

import styles from './search.module.scss'

class Search extends PureComponent {
  state = {
    hotkeys: null, // 获取黑色的 hotkey
    defaultHotKeys: null, // 获取红色的hotkey
    keyword: '', // 获取用户的搜索内容
    isShowCancel: false, // 是否显示取消
    isShowDelete: false, // 是否显示删除
    isShowSearchResults: false, // 是否显示搜索结果
    isShowHistory: false, // 是否显示历史记录
    page: 1, // 默认搜索页数为1
    searchResult: null, // 搜索结果
    getLastKeyword: '', // 获取用户上一次的搜索内容
    songsObject: {}, // 存放歌曲,用来判断是否搜索改变了
    history: [], // 播放历史记录
    isGetHotKey: false, // 是否获取hotkey
    isLoading: false, // 是否在加载搜索结果
    isLoad: true // 能否继续加载数据
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    this.setState({
      history: localStorage.getItem('HISTORY_KEY') ? localStorage.getItem('HISTORY_KEY').split(',') : []
    })
    this.getHotList()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  // 获取热门搜索
  getHotList() {
    getHotList().then(res => {
      const defaultHotKeys = res.data.hotkey
      const hotkeys = this.shuffle(defaultHotKeys, 6)
      this.setState({
        defaultHotKeys,
        hotkeys,
        isGetHotKey: true
      })
    })
  }

  // 搜索框变化
  handleSearchChange = e => {
    const searchValue = e.target.value ? e.target.value.trim() : e.target.value
    this.setState({
      keyword: searchValue
    })
  }

  // 回车确认
  handleSearchEnter = e => {
    const { keyword } = this.state
    let isShowDelete = false
    if (keyword) {
      isShowDelete = true
    } else {
      isShowDelete = false
      this.reset()
    }
    if (e.keyCode !== 13) {
      this.setState({ isShowDelete })
      return
    }
    if (!!keyword) {
      this.setState({
        isShowDelete,
        isShowHistory: false,
        isShowSearchResults: true
      })
      this.addHistory(keyword)
      this.search(keyword)
    } else {
      this.setState({
        isShowDelete,
        isShowHistory: false
      })
    }
  }

  // 点击到了取消按钮
  handleClickSearchCancel = () => {
    this.setState({
      isShowCancel: false,
      isShowDelete: false,
      isShowHistory: false
    })
    this.reset()
  }

  // 点击到了删除按钮
  handleClickSearchDelete = () => {
    this.setState({
      isShowDelete: false,
      keyword: ''
    })
    this.reset()
  }

  // 删除一个搜索记录
  handleRecordDelete = keyword => {
    const { history } = this.state
    const { setHistoryKey } = this.props
    const index = history.indexOf(keyword)
    history.splice(index, 1)
    this.setState({
      isShowHistory: history.length > 0,
      history: [...history]
    })
    setHistoryKey && setHistoryKey(history.join())
  }

  // 点击到了清除搜索记录
  handleRecordDeleteAll = () => {
    const { setHistoryKey } = this.props
    this.setState({
      isShowHistory: false,
      history: []
    })
    setHistoryKey && setHistoryKey('')
  }

  // 点击到了输入按钮
  handleSearchClick = () => {
    if (this.state.history.length > 0) {
      this.setState({
        isShowCancel: true,
        isShowHistory: true
      })
    } else {
      this.setState({
        isShowCancel: true,
        isShowHistory: false
      })
    }
  }

  // 点击热门搜索的关键词或者点击了搜索记录的歌曲
  handleClickHotKey = keyword => {
    this.setState({
      keyword,
      isShowDelete: true,
      isShowCancel: true,
      isShowHistory: false,
      isShowSearchResults: true
    })
    this.addHistory(keyword)
    this.search(keyword)
  }

  // 添加历史
  addHistory(keyword) {
    const { history } = this.state
    const { setHistoryKey } = this.props
    const hasExists = history.includes(keyword)
    if (!hasExists) {
      history.unshift(keyword)
      this.setState({
        history
      })
      setHistoryKey && setHistoryKey(history.join())
    }
  }
  search(keyword, page) {
    if (keyword === undefined) keyword = ''
    if (keyword === '') return

    //如果已经搜索过，并且没有改动 keyword 那么直接返回
    if (this.state.getLastKeyword === keyword && this.state.songsObject[page || this.state.page]) return

    if (this.state.isLoading || !this.state.isLoad) return
    if (this.state.getLastKeyword !== keyword) this.reset()
    this.setState({
      getLastKeyword: keyword
    })
    this.setState({
      isLoading: true
    })

    getSearchList(keyword, page || this.state.page)
      .then(res => {
        this.setState({
          page: res.data.song.curpage,
          songsObject: { ...this.state.songsObject, [page || this.state.page]: res.data.song.list },
          searchResult: this.state.searchResult
            ? this.state.searchResult.concat(res.data.song.list)
            : res.data.song.list,
          isLoading: false,
          isLoad: res.message !== 'no results'
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  // 滚动加载数据
  onScroll = e => {
    if (this.state.isLoad) {
      if (document.documentElement.clientHeight + window.pageYOffset > document.body.scrollHeight - 100) {
        this.search(this.state.keyword, this.state.page + 1)
      }
    } else {
      return window.removeEventListener('scroll', this.onScroll)
    }
  }

  // 显示 player 信息
  showPlayerDetail = song => {
    const { showPlayer, getSong } = this.props
    showPlayer && showPlayer()
    getSong && getSong({ ...song })

    this.props.history.push('/player')
  }
  // 重置
  reset() {
    this.setState({
      page: 1,
      isLoad: true,
      songsObject: {},
      searchResult: null
    })
  }

  // 洗牌
  shuffle(array, count) {
    let arr = []
    // console.log('array: ', array)

    let len = Math.min(count, array.length)
    for (let i = 0; i < len; i++) {
      let temp = array
      let random = Math.floor(Math.random() * temp.length)
      arr[i] = temp[random]
      array.splice(random, 1)
    }
    return arr
  }

  render() {
    const {
      isLoading,
      isLoad,
      keyword,
      isShowCancel,
      isShowDelete,
      isShowSearchResults,
      searchResult,
      isShowHistory,
      isGetHotKey,
      defaultHotKeys,
      hotkeys,
      history = []
    } = this.state
    return (
      <div className={styles['search_wrap']}>
        <div className={styles['content']}>
          <div className={styles['search_bar']}>
            <div className={styles['input_wrap']}>
              <input
                type="text"
                className={styles['search_input']}
                value={keyword}
                onChange={this.handleSearchChange}
                onKeyUp={this.handleSearchEnter}
                onClick={this.handleSearchClick}
                placeholder="搜索歌曲、歌单、专辑"
              />
              <span className={styles['icon_search']} />
              {isShowDelete && (
                <span className={styles['icon_delete']} onClick={this.handleClickSearchDelete}>
                  删除
                </span>
              )}
            </div>
            {isShowCancel && (
              <div className={styles['search_cancel']} onClick={this.handleClickSearchCancel}>
                取消
              </div>
            )}
          </div>

          {history.length > 0 && isShowHistory && (
            <div className={styles['record_keys']}>
              {history.map((item, index) => (
                <li key={item} className={styles['record_item']}>
                  <div className={styles['record_main']}>
                    <i className={`${styles['icon_clock']}`} />
                    <span className={styles['record_con']} onClick={() => this.handleClickHotKey(item)}>
                      {item}
                    </span>
                    <i className={styles['icon_close']} onClick={() => this.handleRecordDelete(item)} />
                  </div>
                </li>
              ))}
              <p className={styles['record_delete']} onClick={this.handleRecordDeleteAll}>
                清除搜索记录
              </p>
            </div>
          )}

          {isShowSearchResults && (
            <div className={styles['search_results']}>
              <div className={styles['song_list']}>
                {searchResult &&
                  searchResult.map((item, songIndex) => (
                    <div
                      className={styles['song_item']}
                      key={item.songid + '' + songIndex}
                      onClick={() => this.showPlayerDetail(item)}
                    >
                      <i className={styles['icon_music']} />
                      <div className={styles['song_name']} dangerouslySetInnerHTML={{ __html: item.songname }} />
                      <div className={styles['song_artiist']}>
                        {item.singer &&
                          item.singer.map((artist, index) => <span key={index}>{artist.name + ' '}</span>)}
                      </div>
                    </div>
                  ))}
              </div>
              {isLoading && <SearchLoading message="正在载入更多..." />}
              {!isLoad && (
                <SearchLoading>
                  <div className={styles['loading_done']} style={{ color: '#808080', fontSize: '12px' }}>
                    已加载全部
                  </div>
                </SearchLoading>
              )}
            </div>
          )}

          {!isShowHistory && !isShowSearchResults && (
            <div className={styles['mod_search_result']}>
              <h3 className={styles['result_tit']}>热门搜索</h3>
              {isGetHotKey && (
                <div className={styles['result_tags']}>
                  {defaultHotKeys.special_url && (
                    <a href={defaultHotKeys.special_url} className={`${styles['tag']} ${styles['tag_hot']}`}>
                      {defaultHotKeys.special_key}
                    </a>
                  )}
                  {hotkeys &&
                    hotkeys.map(hotkey => (
                      <div
                        className={`${styles['tag']} ${styles['tag_keyword']}`}
                        key={hotkey.n}
                        onClick={() => this.handleClickHotKey(hotkey.k)}
                      >
                        {hotkey.k}
                      </div>
                    ))}
                </div>
              )}
              {!isGetHotKey && <SearchLoading message="正在加载..." />}
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isShowPlayer: state.app.isShowPlayer,
    isPlay: state.app.isPlay,
    song: state.app.song,
    artist: state.app.artist
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHistoryKey: history => {
      dispatch({ type: 'app/setHistoryKey', payload: history })
    },
    getSong: song => {
      dispatch({ type: 'app/getSong', payload: song })
    },
    showPlayer: () => {
      dispatch({ type: 'app/showPlayer' })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
