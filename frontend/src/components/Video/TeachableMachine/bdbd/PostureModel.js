// import * as modeldata from "./cw_model/model.json"
export const modelURL = `model.json`
export const metadataURL = `metadata.json`
export const binURL = `weights.bin`
// import modelURL from require("./cw_model/model.json")
// import metadataURL from require("./cw_model/metadata.json")
// import binURL from require("./cw_model/weights.bin")
const URL = `https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/`
const tmPose = window.tmPose

export class PostureModel {
  constructor(videoRef) {
    this.posture = null
    this.model = tmPose.load(URL + modelURL, URL + metadataURL)
    this.maxPredictions = null
    this.itsBad = false
    this.videoRef = videoRef
    this.action = null
  }

  async init() {
    this.videoRef.width = this.videoRef.current.offsetWidth
    this.videoRef.height = this.videoRef.current.offsetHeight
  }

  async loadModel() {
    this.model = await tmPose.load(URL + modelURL, URL + metadataURL)
    this.maxPredictions = this.model.getTotalClasses()

    // this.model = await tmPose.load(modelURL)
    // tmPose.load(modelURL, metadataURL).then((res) => {
    //   this.posture = res
    //   console.log("모델 로딩")
    // })
  }

  async loop() {
    await this.predict()
  }

  async predict() {
    /* eslint-disable */
    console.log(this.model)
    const { pose, posenetOutput } = await this.model.estimatePose(
      this.videoRef.current
    )
    const prediction = await this.model.predict(posenetOutput)
    console.log(pose, "<<<")
    console.log(posenetOutput, ">>>")
  }

  async callbackPosture(
    { className, probability },
    beforeAction,
    changeAction
  ) {
    this.action = className
    const prob = parseInt(probability.toFixed(2))
    this.itsBad = false
    if (prob >= 0.85) {
      if (this.action === "turtle") {
        this.itsBad = true
      } else if (this.action === "tilted") {
        this.itsBad = true
      } else if (this.action === "left") {
        this.itsBad = true
      } else if (this.action === "normal") {
        this.itsBad = false
      }
      changeAction(this.action)
    }
    return this.itsBad
  }
}
