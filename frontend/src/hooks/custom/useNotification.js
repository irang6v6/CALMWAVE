export function useNotification() {
  const notify = function (notifyObj) {
    if (!("Notification" in window)) {
      alert("알람 권한이 거절 된 상태입니다.")
      return
    } else if (Notification.permission === "granted") {
      new Notification(notifyObj)
    } else if (Notification.permission === "denied") {
      Notification.requestPermission().then((res) => {
        if (res === "granted") {
          new Notification(notifyObj)
        }
      })
    }
  }

  return notify
}

/*
notifyObj
{
  title,
  body,
  icon,
  lang,
  image,
  requireInteraction, // boolean
}
onclose랑 onclick 을 넣어줘도 작동 하나?
*/
