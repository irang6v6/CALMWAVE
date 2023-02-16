import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { OpenVidu } from "openvidu-browser"
import axios from "axios"
import UserVideoComponent from "./UserVideoComponent"
import styles from "./Video.module.css"
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillVideoCamera,
} from "react-icons/ai"
import { useNotification } from "../../hooks/custom/useNotification"
import { GiPianist, GiHighKick } from "react-icons/gi"
import new_logo from "../../assets/new_logo.png"
import buttonAlarm from "../../assets/alarm/buttonalarm.mp3"
import pinThree from "../../assets/alarm/pin3.mp3"

const OPENVIDU_SERVER_URL = "https://i8a105.p.ssafy.io:8443/"
const OPENVIDU_SERVER_SECRET = "WAVES"
const tmPose = window.tmPose
const modelURL =
  "https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/model.json"
const metadataURL =
  "https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/metadata.json"

let frameIDs = []

export default function Video(props) {
  const user = useSelector((state) => state.user.userData)
  const progress = useSelector((state) => state.todos.onProgress)
  const [mySessionId, setMySessionId] = useState(`${user.id}-${Date.now()}`)
  const [session, setSession] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  /* eslint-disable */
  const [OV, setOV] = useState()
  const [view, setView] = useState(true)

  const [model, setModel] = useState(null)
  const [webcam, setWebcam] = useState(null)
  const [nowPosture, setNowPosture] = useState("normal")
  const [postureAlarm, setPostureAlarm] = useState(true)
  const audioRef = useRef(null)
  const [badCnt, setBadCnt] = useState(0)
  const [stretchingAlarm, setStretchingAlarm] = useState(true)
  const [stretchingAlarmDelay, setStretchingAlarmDelay] = useState(60)

  // 최초 진입 시 세션 접속
  useEffect(() => {
    joinSession()
  }, [])

  // 페이지 변동에 따른 세션 종료
  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      leaveSession()
      cancelAnimationFrame(props.videoRef.current)
    }
  }, [session])

  useEffect(
    function () {
      if (props.videoRef.current && session) {
        settingModel()
        sizeSet()
      }
    },
    [props.videoRef.current, session]
  )

  const prevNowPosture = useRef("normal")

  useEffect(() => {
    if (postureAlarm && progress) {
      const interval = setInterval(() => {
        if (
          nowPosture !== "normal"
        ) {
          prevNowPosture.current = nowPosture
          audioRef.current.src = pinThree
          audioRef.current.play()
          callNotification("자세 알람", "바른 자세를 유지해봅시다!")
        }
      }, 5000)
      return function () {
        clearInterval(interval)
      }
    }
  }, [nowPosture, postureAlarm])

  useEffect(() => {
    let timeoutId
    let startTime = Date.now()

    function stretchingInterval() {
      if (progress && stretchingAlarm) {
        if (Date.now() - startTime >= stretchingAlarmDelay * 60 * 1000) {
          audioRef.current.src = buttonAlarm
          audioRef.current.play()
          callNotification("스트레칭 알람", "스트레칭할 시간이에요!")
          startTime = Date.now()
        }
        timeoutId = setTimeout(stretchingInterval, 1000)
      }
    }
    stretchingInterval()
    return function () {
      clearTimeout(timeoutId)
    }
  }, [progress, stretchingAlarmDelay, stretchingAlarm])

  const settingModel = async function () {
    const a = await tmPose.load(modelURL, metadataURL)
    setModel(() => a)
  }

  const sizeSet = async function () {
    let w = null
    let h = null
    if (props.videoRef.current) {
      w = props.videoRef.current.offsetWidth
      h = props.videoRef.current.offsetHeight
    }
    const wc = await new tmPose.Webcam(w || 300, h || 200, true)
    setWebcam(() => wc)
  }

  const loop = async function (timestamp) {
    if (props.videoRef.current && webcam) {
      sizeSet()
      predict()
    }
  }

  useEffect(() => {
    settingModel()
    sizeSet()
  }, [])

  useEffect(() => {
    function handleResize() {
      sizeSet()
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const predict = async function () {
    if (!model) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(
      props.videoRef.current
    ) // posenetOutput : 좌표에 관한 내용이 들어가 있음.
    const prediction = await model.predict(posenetOutput)
    for (let i = 0; i < 4; i++) {
      const rtPosture = prediction[i]
      if (rtPosture.probability.toFixed(2) > 0.9999) {
        // nowPosture, setNowPosture, posture, setPosture, badCnt, setBadCnt
        // if nowposture가 rtPosture.class와 같다면
        // posture를 덮어서 갱신.
        setBadCnt((val) => {
          if (nowPosture === rtPosture.className) {
            return val + 1
          } else {
            return 0
          }
        })
        setNowPosture((oldPosture) => rtPosture.className)
      }
    }
  }

  useEffect(
    function () {
      setTimeout(function () {
        if (props.videoRef.current) {
          const aniId = window.requestAnimationFrame(loop)
          frameIDs.push(aniId)
        }
      }, 1000)

      return function () {
        let frameID
        if (frameIDs.length > 0) {
          frameID = frameIDs.shift()
          window.cancelAnimationFrame(frameID)
        }
      }
    },
    [props.videoRef.current, webcam, predict]
  )

  useEffect(
    function () {
      if (nowPosture !== "normal" && nowPosture !== "left" && badCnt > 6000) {
        setBadCnt(() => 0)
        // 액시오스 요청
        const requestPosture = nowPosture
        axios({
          method: "post",
          url: "/v1/posture/save",
          data: {
            className: requestPosture,
          },
        })
      } else if (nowPosture === "left" && badCnt > 54000) {
        // 액시오스 요청
        axios({
          method: "post",
          url: "/v1/posture/save",
          data: {
            className: "left",
          },
        })
      }
      return function () {
        const source = axios.CancelToken.source()
        source.cancel("cancelling in cleanup")
      }
    },
    [badCnt, nowPosture]
  )

  // 토큰 반환 (추가 예정)
  const getToken = async () => {
    const sessionId = await createSession(mySessionId)
    return await createToken(sessionId)
  }

  // 세션에 참여하는 함수
  const joinSession = () => {
    const newOV = new OpenVidu()
    newOV.enableProdMode()
    const mySession = newOV.initSession()

    setOV(newOV)
    setSession(mySession)
    const connection = () => {
      // subscribers 관련 내용 삭제

      // 토큰 가져오기 (수정 예정)
      getToken().then((token) => {
        mySession
          .connect(token, { clientData: `${user.nickname}` })
          .then(async () => {
            // 화면 가져오기
            newOV
              .getUserMedia({
                audioSource: false,
                videoSource: undefined,
                resolution: undefined, 
                frameRate: 30, 
              })
              .then((mediaStream) => {
                let newPublisher = newOV.initPublisher(`${user.nickname}`, {
                  audioSource: undefined,
                  publishAudio: false, 
                  publishVideo: true, 
                  mirror: true, 
                  insertMode: "APPEND",
                })
                newPublisher.once("accessAllowed", () => {
                  mySession.publish(newPublisher)
                  setPublisher(newPublisher)
                })
              })
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            )
          })
      })
    }
    connection()
  }

  const leaveSession = () => {
    // session에 따른 useEffect -> 세션이 남아있는 경우에만 실행되도록
    if (!session) return
    session?.disconnect()
    // 데이터 비우기
    setOV(null)
    setSession(undefined)
    setMySessionId("Session")
    setPublisher(undefined)
  }

  const reJoinSession = () => {
    setMySessionId(`${user.id}-${Date.now()}`)
    leaveSession()
      .then(() => {
        joinSession()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createSession = async (sessionId) => {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "openvidu/api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    )
    return response.data.sessionId // The sessionId
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(
      OPENVIDU_SERVER_URL +
        "openvidu/api/sessions/" +
        sessionId +
        "/connection",
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Content-Type": "application/json",
        },
      }
    )
    return response.data.token // The token
  }

  const toggleView = () => {
    setView(!view)
  }

  const togglePostureAlarm = () => {
    setPostureAlarm(!postureAlarm)
  }

  const toggleStretchingAlarm = () => {
    setStretchingAlarm(!stretchingAlarm)
  }

  const callNotification = (title, body) => {
    const notification = useNotification()
    notification(title, body)
  }

  return (
    <>
      <div className={`${styles[`empty`]}`}>empty</div>
      <div className={`${styles["video-info-container"]}`}>
        <div className={`${styles["videobox"]}`}>
          <div className={`${styles["video"]}`}>
            {publisher === undefined ? (
              <AiFillVideoCamera
                onClick={reJoinSession}
                className={`${styles[`videobox-icon`]} ${
                  styles["icon-animation"]
                }`}
              />
            ) : (
              <>
                <UserVideoComponent
                  streamManager={publisher}
                  className={`${!view && styles[`visi-hidden`]}`}
                  videoRef={props.videoRef}
                />
                <img
                  src={new_logo}
                  className={`${styles[`logo-icon`]}
                ${view && styles[`display-none`]}
                `}
                />
              </>
            )}
          </div>
          <div className={`${styles["videonav"]}`}>
            {publisher === undefined ? (
              <div></div>
            ) : (
              <div onClick={toggleView}>
                {view ? (
                  <AiFillEye className={`${styles[`videobox-icon`]}`} />
                ) : (
                  <AiFillEyeInvisible
                    className={`${styles[`videobox-icon`]}`}
                  />
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className={`${styles["info-container"]}
        ${progress && styles["info-container_focused"]}`}
        >
          <audio ref={audioRef} />
          <div className={`${styles[`post-alarm-container`]}`}>
            자세 알람
            <GiPianist
              className={`${styles[`info-icon`]} ${
                nowPosture !== "normal" && styles[`posture-info`]
              }
             ${!postureAlarm && styles[`posture-info-deact`]}`}
              onClick={togglePostureAlarm}
            />
          </div>
          <div className={`${styles[`stre-alarm-container`]}`}>
            스트레칭 알람
            <div className={`${styles[`stre-input-container`]}`}>
              <input
                type="number"
                min="1"
                step="5"
                value={stretchingAlarmDelay}
                onChange={(e) => setStretchingAlarmDelay(e.target.value)}
                className={`${styles[`alarm-input`]}`}
              />
              분
            </div>
              <GiHighKick
                className={`${styles[`info-icon`]}
             ${!stretchingAlarm && styles[`stre-info-deact`]}`}
                onClick={toggleStretchingAlarm}
              />
          </div>
        </div>
      </div>
    </>
  )
}
