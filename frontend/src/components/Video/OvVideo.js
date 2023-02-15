import React, { Component } from "react"

/* eslint-disable */
export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props)
    // this.videoRef = React.createRef() // videoRef
  }

  componentDidUpdate(props) {
    if (props && !!this.props.videoRef) {
      this.props.streamManager.addVideoElement(this.props.videoRef.current)
    }
  }

  componentDidMount() {
    if (this.props && !!this.props.videoRef) {
      this.props.streamManager.addVideoElement(this.props.videoRef.current)
    }
  }

  render() {
    return (
      <>
        <video autoPlay={true} ref={this.props.videoRef}></video>
      </>
    )
  }
  w
}
