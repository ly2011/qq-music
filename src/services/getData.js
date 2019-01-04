import request from '../utils/request'
import { RECOMMEND_URL, TOPLIST_URL, HOTKEYS_URL } from '../config/api'
import { searchUrl, lyricsUrl } from '../config/url'

// 获取推荐
export const getRecommendList = () => {
  return request({
    url: RECOMMEND_URL
  })
}

// 获取排行榜
export const getRankList = () => {
  return request({
    url: TOPLIST_URL
  })
}

// 获取热门搜索关键词
export const getHotList = () => {
  return request({
    url: HOTKEYS_URL
  })
}

// 获取搜索内容
export const getSearchList = (keyword, page) => {
  return request({
    url: searchUrl(keyword, page)
  })
}

// 获取歌词
export const getLyrics = songid => {
  return request({
    url: lyricsUrl(songid)
  })
}
