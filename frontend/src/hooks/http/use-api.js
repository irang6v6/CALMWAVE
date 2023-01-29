import axios from "axios"
import { useState, useCallback } from "react"

const useApi = function () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const axiosRequest = useCallback(async (requestData, saveDataFunction) => {
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
    setIsLoading(true)
    await axios(requestData)
      .then((res) => {
        saveDataFunction(res.data)
      })
      .then((res) => {
        setIsLoading(false)
      })
      .catch((err) => {
        setError(true)
        setIsLoading(false)
      })
  }, [])

  return {
    isLoading,
    error,
    axiosRequest,
  }
}

export default useApi

/*
사용법은
const {isLoading, error, axiosRequest} = useApi()
로 할당한 뒤, useEffect 혹은 여러 곳에서
axiosRequest 함수를 호출하게 되는데
axiosRequest(requestData, saveDataFunction) 의 각각 인자는 axios 요청을 보낼 객체, 해당 response를 받아서 실행 할 로직. 이런식으로 넣어준다.

*/
