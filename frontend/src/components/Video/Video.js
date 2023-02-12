import React, { useState, useEffect } from "react"
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
import new_logo from "../../assets/new_logo.png"

const OPENVIDU_SERVER_URL = "https://i8a105.p.ssafy.io:8443/"
const OPENVIDU_SERVER_SECRET = "WAVES"
const tmPose = window.tmPose
const modelURL =
  "https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/model.json"
const metadataURL =
  "https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/metadata.json"

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
  const [posture, setPosture] = useState("")

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
    }
  }, [session])
  useEffect(function () {
    settingModel()
    initialSet()
  }, [])

  useEffect(
    function () {
      if (props.videoRef) {
        loop()
      }
    },
    [props.videoRef.current]
  )

  const settingModel = async function () {
    const a = await tmPose.load(modelURL, metadataURL)
    setModel(() => a)
  }

  const initialSet = async function () {
    const size = 200
    const wc = await new tmPose.Webcam(200, 200, true)
    setWebcam(() => wc)
  }

  const loop = async function (timestamp) {
    if (props.videoRef) {
      webcam.update()
      predict()
      await webcam.setup()
      await webcam.play()
      window.requestAnimationFrame(loop)
    }
  }
  const predict = async function () {
    if (!props.videoRef.current) {
      return
    }
    const { pose, posenetOutput } = await model.estimatePose(
      props.videoRef.current
    ) // posenetOutput : 좌표에 관한 내용이 들어가 있음.
    const prediction = await model.predict(posenetOutput)

    for (let i = 0; i < 4; i++) {
      const rtPosture = prediction[i]
      if (rtPosture.probability.toFixed(2) > 0.99) {
        console.log(rtPosture, "<<<<")
      }
    }
  }

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
                audioSource: false, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                // resolution: "640x480", // The resolution of your video
                resolution: undefined, // The resolution of your video
                frameRate: 30, // The frame rate of your video
              })
              .then((mediaStream) => {
                let newPublisher = newOV.initPublisher(`${user.nickname}`, {
                  audioSource: undefined,
                  publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  mirror: true, // Whether to mirror your local video or not
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

  // 카메라 변경 함수
  // async switchCamera() {
  //     try {
  //         const devices = await this.OV.getDevices()
  //         var videoDevices = devices.filter(device => device.kind === 'videoinput');

  //         if (videoDevices && videoDevices.length > 1) {

  //             var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

  //             if (newVideoDevice.length > 0) {
  //                 // Creating a new publisher with specific videoSource
  //                 // In mobile devices the default and first camera is the front one
  //                 var newPublisher = this.OV.initPublisher(undefined, {
  //                     videoSource: newVideoDevice[0].deviceId,
  //                     publishAudio: true,
  //                     publishVideo: true,
  //                     mirror: true
  //                 });

  //                 //newPublisher.once("accessAllowed", () => {
  //                 await this.state.session.unpublish(this.state.mainStreamManager)

  //                 await this.state.session.publish(newPublisher)
  //                 this.setState({
  //                     currentVideoDevice: newVideoDevice[0],
  //                     mainStreamManager: newPublisher,
  //                     publisher: newPublisher,
  //                 });
  //             }
  //         }
  //     } catch (e) {
  //         console.error(e);
  //     }
  // }

  return (
    <>
      <div className={`${styles[`empty`]}`}>empty</div>
      <div className={`${styles["video-info-container"]}`}>
        <div className={`${styles["videobox"]}`}>
          <div className={`${styles["video"]}`}>
            {publisher === undefined ? (
              <AiFillVideoCamera
                onClick={reJoinSession}
                className={`${styles[`videobox-icon`]}
                ${styles['icon-animation']}
                `}
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
        ></div>
      </div>
    </>
  )
}
