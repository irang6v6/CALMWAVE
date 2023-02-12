import React, { Component } from "react"
import OpenViduVideoComponent from "./OvVideo"

export default class UserVideoComponent extends Component {
  // getNicknameTag() {
  //     // Gets the nickName of the user
  //     return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  // }
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className={`streamcomponent ${this.props.className}`}>
            <OpenViduVideoComponent
              streamManager={this.props.streamManager}
              videoRef={this.props.videoRef}
            />
            {/* <div><p>{this.getNicknameTag()}</p></div> */}
          </div>
        ) : null}
      </div>
    )
  }
}
