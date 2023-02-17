import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setAccess, setRefresh } from "../../store/token-slice"

function OauthLoad() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  /* eslint-diabled */
  useEffect(
    function () {
      const AccessToken = searchParams.get("AccessToken")
      const RefreshToken = searchParams.get("RefreshToken")
      // const userid = searchParams.get("userid")
      console.log(AccessToken, RefreshToken)
      setAccess(AccessToken)
      setRefresh(RefreshToken)
      navigate("/")
    },
    [searchParams, navigate]
  )
  return (
    <>
      <div></div>
    </>
  )
}

export default OauthLoad
