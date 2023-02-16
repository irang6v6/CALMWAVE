import logo from "../../assets/favicon.ico"

export function useNotification() {
  const notify = function (title, body) {
    const notiForm = {
      body: body,
      icon: logo,
      requireInteraction: true,
      badge: logo,
      lang: "ko-KR",
      silent: true,
    }
    if (!("Notification" in window)) {
      alert("알람 권한이 거절 된 상태입니다.")
      return
    } else if (Notification.permission === "granted") {
      new Notification(title, notiForm)
    } else if (Notification.permission === "denied") {
      Notification.requestPermission().then((res) => {
        if (res === "granted") {
          new Notification(title, notiForm)
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
