export function getChatDataByRoomId (data, id) {
  for (const item of data) {
    if (item.roomId === id) {
      return item
    }
  }
}
