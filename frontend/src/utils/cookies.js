import { Cookies } from "react-cookie"
import axios from "axios"

const cookies = new Cookies()

const setCookies = function (name, value, option) {
  return cookies.set(name, value, { ...option })
}

const getCookies = function (name) {
  return cookies.get(name)
}

const setTokens = function (name, value, option) {
  const [AccessToken, RefreshToken] = [
    getCookies("AccessToken"),
    getCookies("RefreshToken"),
  ]
  axios({
    method: "post",
    url: "", // 토큰 연장 url이 있을듰?
    headers: {
      AccessToken,
      RefreshToken,
    },
  })
    .then((res) => {})
    .catch((err) => {})
}

export { setCookies, getCookies }
