import axios from "axios"
import { useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { setAccess, setRefresh } from "../../store/token-slice"

const useApiTwoFunc = function () {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const axiosRequest = useCallback(
    async (requestData, saveDataFunction, afterEffectFunction) => {
      setIsLoading(true)
      await axios(requestData)
        .then((res) => {
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
          return res
        })
        .then((res) => {
          afterEffectFunction(res)
          setIsLoading(false)
          setError(false)
        })
        .catch((err) => {
          setIsLoading(false)
          setError(true)
        })
    },
    [dispatch]
  )

  return [isLoading, error, axiosRequest]
}

export default useApiTwoFunc
