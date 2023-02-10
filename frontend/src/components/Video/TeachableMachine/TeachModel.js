const tmPose = window.tmPose

const URL = {
  POSTURE:
    "https://teachablemachine.withgoogle.com/models/5kCzQ3Epp/model.json",
}

export class Model {
  modelTest = undefined
  modelPushup = undefined
  modelBurpee = undefined
  modelJumpingjack = undefined
  modelLateralraise = undefined
  modelLunge = undefined
  modelSquat = undefined

  constructor() {
    this.callbackTest = this.callbackTest.bind(this)
  }
  async loadModel() {
    tmPose
      .load(URL["POSTURE"] + "/model.json", URL["POSTURE"] + "/metadata.json")
      .then((res) => {
        this.modelPushup = res
        console.log("푸시업 모델 로딩 완료")
      })
  }

  modelsLoaded() {
    const models = [this.modelTest]
    for (let i in models) {
      if (!models[i]) return false
    }
    return true
  }

  callbackTest({ className, probability }, beforeAction, changeAction) {
    // console.log("callbackPushup()")
    // console.log(changeAction)
    const action = className
    const prob = parseInt(probability.toFixed(2))
    let itsBad = false
    if (prob >= 0.85) {
      if (action === "turtle") {
        itsBad = true
      } else if (action === "tilted") {
        itsBad = true
      } else if (action === "left") {
        itsBad = true
      } else if (action === "normal") {
        itsBad = false
      }
      changeAction(action)
    }

    return itsBad
  }
}
