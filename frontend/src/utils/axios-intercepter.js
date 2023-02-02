import axios from "axios"

// axios.defaults.transformRequest
// axios.interceptors

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
