export default {
  namespace: 'app',
  state: {
    isShowPlayer: false, // 是否显示 player
    song: {}, // 歌的信息
    artist: '', // 歌的作者
    isPlay: false // 是否播放
  },
  reducers: {
    // 缓存搜索历史
    setHistoryKey(state, { payload: keyword }) {
      localStorage.setItem('HISTORY_KEY', keyword)
      return { ...state }
    },
    // 获取歌曲
    getSong(state, { payload }) {
      // console.log('getSong: ', payload)
      const song = payload
      let { artist } = state
      song.singer.forEach(singer => {
        artist = singer.name
      })
      return { ...state, song, artist }
    },
    // 显示 player
    showPlayer(state) {
      // console.log('showPlayer')
      return { ...state, isShowPlayer: true }
    },
    // 不显示 player
    cancelPlayer(state) {
      return { ...state, isShowPlayer: false }
    },
    // 播放状态(true/false)
    setPlayState(state, { payload: flag }) {
      return { ...state, isPlay: flag }
    }
  }
}
