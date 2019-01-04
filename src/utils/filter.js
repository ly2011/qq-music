// 格式化万单位的数字
export const dealNum = num => {
  if (typeof num === 'number') {
    if (num > 10000) {
      return (num / 10000).toFixed(1) + '万'
    }
  }
  return num
}

// 格式化时间
export const formatTime = seconds => {
  let mins = Math.floor(seconds / 60)
  let secs = Math.floor(seconds % 60)
  if (mins < 10) {
    mins = '0' + mins
  }
  if (secs < 10) {
    secs = '0' + secs
  }
  return `${mins}:${secs}`
}
