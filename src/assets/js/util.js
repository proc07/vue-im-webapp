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
