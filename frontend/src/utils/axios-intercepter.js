import axios from "axios"

// axios.defaults.transformRequest
// axios.interceptors
/*
  Axios Interceptor는 axios instance를 만들어서 interceptor 세팅을 해주면 된다.
  단, 현재 사용하는 spring security의 경우, access token이 만료되면 자동으로 response.data.response에 accesstoken이 담겨진다고 함.
  그렇기에, 그런 특성을 이용하여 interceptor가 아니라, 조건문을 추가해서 localStorage의 token들을 관리해준다.
 */

const JWTInterceptor = function () {
  const AccessToken = localStorage.getItem("AccessToken")
  const RefreshToken = localStorage.getItem("RefreshToken")
}

const axiosInstance = axios.create({
  baseURL: "https://your-api.com/",
})

const token = localStorage.getItem("token")

axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  }

  // Example of transforming request data
  config.transformRequest = [
    (data, headers) => {
      headers["Content-Type"] = "application/json"
      return JSON.stringify(data)
    },
  ]

  return config
})

export default axiosInstance
