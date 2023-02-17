import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setAccess, setRefresh } from "../../store/token-slice"

const useApi = function () {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // requestData = {
  //   method: requestData.method,
  //   url: requestData.url,
  //   // transformRequest: ,
  //   // transformResponse: ,
  //   headers: requestData.headers,
  //   data: requestData.data,
  //   timeout: requestData.timeout,
  //   withCredentials: requestData.withCredentials,
  // }

  const axiosRequest = useCallback(
    async (requestData, saveDataFunction) => {
      setIsLoading(() => true)
      setError(() => false)
      await axios(requestData)
        .then((res) => {
          console.log(res)
          if (res?.data?.response?.AccessToken) {
            dispatch(setAccess(`Bearer ` + res.data.response.AccessToken))
          }
          if (res?.data?.response?.RefreshToken) {
            dispatch(setRefresh(`Bearer ` + res.data.response.RefreshToken))
          }
          return res
        })
        .then((res) => {
          saveDataFunction(res)
        })
        .then(() => {
          setIsLoading(false)
          setError(false)
        })
        .catch((err) => {
          // saveDataFunction(err) // 에러처리까지 해두었다면
          setIsLoading(false)
          setError(true)
        })
    },
    [dispatch]
  )

  // const getNewAccessToken = useCallback(
  //   async (requestData, saveDataFunction) => {
  //     let [AccessToken, RefreshToken] = [
  //       localStorage.getItem("AccessToken"),
  //       localStorage.getItem("RefreshToken"),
  //     ]
  //     axios.defaults.headers = { AccessToken, RefreshToken }
  //     await axios({
  //       method: "post",
  //       // baseURL: "",
  //       url: "/login",
  //     })
  //   }
  // )

  return [isLoading, error, axiosRequest]
}

export default useApi

/*
사용법은
const {isLoading, error, axiosRequest} = useApi()
로 할당한 뒤, useEffect 혹은 여러 곳에서
axiosRequest 함수를 호출하게 되는데
axiosRequest(requestData, saveDataFunction) 의 각각 인자는 axios 요청을 보낼 객체, 해당 response를 받아서 실행 할 로직. 이런식으로 넣어준다.

로컬호스트 포트 로그인
*/
