import { OpenVidu } from "openvidu-browser"
import axios from "axios"
import React, { useState } from "react"
import UserVideoComponent from "./UserVideoComponent"
import { useEffect } from "react"
import styles from "./Video.module.css"

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/"

export default function Video() {
  const [mySessionId, setMySessionId] = useState("SessionA")
  // const [myUserName, ] = useState(
  //   "Participant" + Math.floor(Math.random() * 100)
  // )
  const [session, setSession] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  /* eslint-disable */
  const [OV, setOV] = useState()

  useEffect(() => {
    joinSession()
  }, [])

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession)
    return () => {
      leaveSession()
      window.removeEventListener("beforeunload", leaveSession)
    }
  }, [session])

  const getToken = async () => {
    const sessionId = await createSession(mySessionId)
    return await createToken(sessionId)
  }

  // // 세션에 참여하는 함수
  const joinSession = () => {
    // e.preventDefault()

    const newOV = new OpenVidu()
    newOV.enableProdMode()
    const mySession = newOV.initSession()

    setOV(newOV)
    setSession(mySession)

    const connection = () => {
      // subscribers 관련 내용 삭제

      // 토큰 가져오기
      getToken().then((token) => {
        mySession
          .connect(token, { clientData: "Participant 77" })
          .then(async () => {
            // 화면 가져오기
            newOV
              .getUserMedia({
                audioSource: false, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                // resolution: "640x480", // The resolution of your video
                resolution: undefined, // The resolution of your video
                // resolution: "320x240", // The resolution of your video
                frameRate: 30, // The frame rate of your video
              })
              .then((mediaStream) => {
                // let videoTrack = mediaStream.getVideoTracks()[0]

                let newPublisher = newOV.initPublisher("Participant 77", {
                  audioSource: undefined,
                  // videoSource: videoTrack,
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
    if (!session) return
    session?.disconnect()

    setOV(null)
    setSession(undefined)
    setMySessionId("SessionA")
    setPublisher(undefined)
  }

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    return response.data // The sessionId
  }

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    return response.data // The token
  }

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
    <div className={`${styles["videobox"]} bg-cw-indigo-7`}>
      {publisher === undefined ? (
        <form className={`${styles["video"]}`} onSubmit={joinSession}>
          <input type="submit" value="JOIN" />
        </form>
      ) : (
        <UserVideoComponent streamManager={publisher} />
      )}
      <div className={`${styles["videonav"]}`}>VIDEO NAV</div>
    </div>
  )
}
