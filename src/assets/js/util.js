export function getChatDataByRoomId (data, id) {
  for (const item of data) {
    if (item.roomId === id) {
      return item
    }
  }
}

export function isJsonParse (val) {
  if (typeof val === 'object') {
    return JSON.parse(val)
  }
  return val
}

export function generateUUID () {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    // use high-precision timer if available
    d += performance.now()
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}
