import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'

import { songUrl, albumCoverUrl } from '../../config/url'
import { getLyrics } from '../../services/getData'
import { formatTime } from '../../utils/filter'

import styles from './player.module.scss'
class Player extends PureComponent {
  audioRef = null
  playerLyricsListRef = null
  progressRef = null
  progressBarRef = null
  state = {
    isLoading: false,

    duration: 0, // 音乐持续时间
    progress: 0, // 进度条
    elapsed: 0, // 当前时间
    progressIntervalId: 0, // 进度条setInterval 返回的 id

    progressMoving: false,
    progressBarWidth: 0,
    startPageX: 0,
    movePageX: 0,

    lyrics: [], // 歌词
    lyricIndex: 0, // 歌词页数
    LINE_HEIGHT: 42, // 歌词的高度(跟css中定义的每一行的歌词高度一致（.player_lyrics_item）)
    lyricIntervalId: 0 // 歌词setInterval 返回的 id
  }
  componentDidMount() {
    const { song } = this.props
    this.setState({
      duration: song.interval
    })
    this.getLyrics()
  }
  componentWillUnmount() {
    try {
      const { setPlayState } = this.props
      this.audioRef.pause()
      setPlayState(false)
      this.pauseLyrics()
      this.pauseProgress()
    } catch (error) {}
  }
  getLyrics = () => {
    const { songid } = this.props.song
    this.setState({ isLoading: true })
    getLyrics(songid)
      .then(res => {
        let { lyric } = res
        lyric = this.formatText(lyric).match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)
        this.setState({
          lyricIndex: 0,
          lyrics: Array.isArray(lyric) ? [...lyric] : []
        })
      })
      .catch(err => {
        console.error(err)
      })
      .then(() => {
        this.setState({ isLoading: false })
      })
  }
  //获取秒数
  getSeconds(line) {
    return +line.replace(/^\[(\d{2}):(\d{2}\.\d{2}).*/, (match, p1, p2) => +p1 * 60 + parseFloat(+p2))
  }
  //格式化文本 类似[xx:xx.xx]xxxxx
  formatText(text) {
    let div = document.createElement('div')
    div.innerHTML = text
    return div.innerText
  }
  // 获取图片地址
  getAlbumCover(id) {
    return albumCoverUrl(id)
  }
  // 获取歌词地址
  getSongUrl(id) {
    return songUrl(id)
  }
  // 播放音频
  onPlay = () => {
    const { isPlay, setPlayState } = this.props
    // 点击暂停
    if (isPlay) {
      try {
        this.audioRef.pause()
        setPlayState(false)
        this.pauseLyrics()
        this.pauseProgress()
      } catch (error) {}
    } else {
      if (this.state.isLoading) return
      try {
        this.audioRef.play()
        setPlayState(true)
        this.startLyrics()
        this.startProgress()
      } catch (error) {}
    }
  }
  // 当一首歌播放结束的时候重新播放
  handleOnAudioEnd = () => {
    try {
      this.audioRef.play()
      this.restartLyrics()
      this.resetProgress()
    } catch (error) {}
  }
  // 开始播放歌词
  startLyrics = () => {
    this.pauseLyrics()
    this.setState({
      lyricIntervalId: setInterval(this.updateLyrics, 1000)
    })
  }
  // 暂停歌词
  pauseLyrics = () => {
    clearInterval(this.state.lyricIntervalId)
  }
  // 更新歌词
  updateLyrics = () => {
    let _self = this
    try {
      this.audioRef.ontimeupdate = function(e) {
        for (let i = 0, len = _self.state.lyrics.length; i < len; i++) {
          if (_self.audioRef.currentTime /*当前播放的时间*/ > _self.getSeconds(_self.state.lyrics[i]) - 0.5) {
            _self.playerLyricsListRef.children[_self.state.lyricIndex] &&
              _self.playerLyricsListRef.children[_self.state.lyricIndex].classList.remove('active')
            _self.playerLyricsListRef.children[i] && _self.playerLyricsListRef.children[i].classList.add('active')
            _self.setState({ lyricIndex: i })
          }
        }
      }
      if (this.state.lyricIndex > 2) {
        let y = -(this.state.lyricIndex - 2) * this.state.LINE_HEIGHT
        this.playerLyricsListRef.style.transform = `translateY(${y}px)`
      }
    } catch (error) {}
  }
  // 重置歌词
  resetLyrics = () => {
    this.pauseLyrics()
    this.playerLyricsListRef.children[this.state.lyricIndex] &&
      this.playerLyricsListRef.children[this.state.lyricIndex].classList.remove('active')
    this.setState({ lyricIndex: 0 })
    this.playerLyricsListRef.style.transform = `translateY(0)`
    if (this.state.lyrics.length) {
      this.playerLyricsListRef.children[0] && this.playerLyricsListRef.children[0].classList.add('active')
    }
  }
  // 重新开始歌词
  restartLyrics = () => {
    this.resetLyrics()
    this.startLyrics()
  }
  // 启动进度条
  startProgress = () => {
    this.pauseProgress()
    this.setState({
      progressIntervalId: setInterval(this.updateProgress, 50)
    })
  }
  // 暂停进度条
  pauseProgress = () => {
    clearInterval(this.state.progressIntervalId)
  }
  // 更新进度条
  updateProgress = () => {
    const { elapsed, duration } = this.state
    const nextElapsed = elapsed + 0.05 // 下一帧的时间
    this.setState({
      elapsed: nextElapsed,
      progress: nextElapsed / duration
    })

    this.progressRef.style.transform = `translateX(${this.state.progress * 100 - 100}%)`
  }
  // 重置进度条
  resetProgress = duration => {
    this.pauseProgress()
    const stateParam = {
      elapsed: 0,
      progress: 0
    }
    if (duration) {
      stateParam.duration = +duration
    }
    this.setState(stateParam)
    this.progressRef.style.transform = 'translateX(-100%)'
  }
  // 重新开始进度条
  restartProgress = () => {
    this.resetProgress()
    this.startProgress()
  }

  // 触摸开始滚动条，记录初始触摸进度
  progressTouchStart = e => {
    this.setState({
      progressMoving: true,
      startPageX: e.touches[0].pageX,
      startOffsetLeft: e.target.offsetLeft,
      progressBarWidth: this.progressBarRef.offsetWidth
    })
  }

  // 一直触摸滚动条移动时，更新进度条的状态
  progressTouchMove = e => {
    const movePageX = e.touches[0].pageX
    const moveDisctance = Math.min(
      this.state.progressBarWidth,
      Math.max(0, this.state.startOffsetLeft + (movePageX - this.state.startPageX))
    )
    const dataProgress = Math.floor((moveDisctance / this.state.progressBarWidth) * 100)
    const elapsed = (dataProgress * this.state.duration) / 100
    // this.audioRef.currentTime = elapsed
    this.setState({ movePageX, elapsed })
  }

  // 触摸进度条完成，更新播放器的播放时间进度
  progressTouchEnd = e => {
    this.setState({
      progressMoving: false
    })
    this.audioRef.currentTime = this.state.elapsed
  }

  render() {
    const { isShowPlayer, isPlay, song, artist } = this.props
    const { lyrics = [], elapsed, isLoading } = this.state
    return (
      <Fragment>
        {isShowPlayer && (
          <div className={`${styles['player']}`}>
            <div className={styles['player_container']}>
              <div className={styles['player_header']}>
                {/* 缺少头像 */}
                <img className={styles['album_cover']} src={this.getAlbumCover(song.albummid)} alt={song.songname} />
                <div className={styles['song_info']}>
                  <div className={styles['song_name']}>{song.songname}</div>
                  <div className={styles['song_artist']}>{artist}</div>
                </div>
                <i
                  className={`${styles['icon_action']} ${styles[isPlay ? 'icon_pause' : 'icon_play']}`}
                  onClick={this.onPlay}
                />
              </div>

              <div className={styles['player_lyrics']}>
                <div className={styles['player_lyrics_list']} ref={lyric => (this.playerLyricsListRef = lyric)}>
                  {lyrics &&
                    lyrics.length > 0 &&
                    lyrics.map((item, index) => (
                      <div className={styles['player_lyrics_item']} key={index}>
                        {item.slice(10)}
                      </div>
                    ))}
                  {isLoading && <div className={styles['player_lyrics_item']}>正在加载歌词,请等待...</div>}
                </div>
              </div>

              <div className={styles['player_footer']}>
                <i className={styles['icon_collect']} />
                <div className={styles['progress']}>
                  <div className={`${styles['progress_time']} ${styles['progress_elapsed']}`}>
                    {formatTime(elapsed)}
                  </div>
                  <div className={styles['progress_bar']} ref={bar => (this.progressBarRef = bar)}>
                    <div
                      className={styles['progress_bar_progress']}
                      ref={progress => (this.progressRef = progress)}
                      onTouchStart={this.progressTouchStart}
                      onTouchMove={this.progressTouchMove}
                      onTouchEnd={this.progressTouchEnd}
                    />
                  </div>
                  <div className={`${styles['progress_time']} ${styles['progress_duration']}`}>
                    {formatTime(song.interval)}
                  </div>
                </div>
                <div className={styles['action']}>
                  <span className={styles['btn_download']}>下载这首歌</span>
                </div>
              </div>
            </div>

            <div
              className={styles['player_background']}
              style={{ backgroundImage: 'url(' + this.getAlbumCover(song.albummid) + ')' }}
            />
            <audio
              src={this.getSongUrl(song.songmid)}
              ref={audio => (this.audioRef = audio)}
              onEnded={this.handleOnAudioEnd}
            />
          </div>
        )}
      </Fragment>
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
    getSong: song => {
      dispatch({ type: 'app/getSong', payload: song })
    },
    showPlayer: () => {
      dispatch({ type: 'app/showPlayer' })
    },
    cancelPlayer: () => {
      dispatch({ type: 'app/cancelPlayer' })
    },
    setPlayState: flag => {
      dispatch({ type: 'app/setPlayState', payload: flag })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
