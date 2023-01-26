import axios from "axios"

axios({
  method: "get", // 메소드
  baseURL: "", // baseURL + url 로 보내짐
  url: "", // baseURL + url 로 보내짐
  transformRequest: [function () {}, function () {}], // 요청 보내기 전에 실행 할 함수. 인터셉터
  transformResponse: [function () {}, function () {}], // 응답 받기 직전 실행 할 기능. 인터셉터
  headers: { 키: "값" },
  params: { key: 1234 }, // ?/ 이후로 담기는 값이지 않나?
  data: { firstName: "Fred" }, // body에 담아달라면 여기 담아주면 됨.
  timeout: 1000, // 요청이 1초 이상 걸리면 중단됨. ms로 시간 계산하며, 최대 응답 대기 시간.
  withCredentials: false, // cors 정책과 관련. 쿠키를 공유하고 싶다면 true 아니면 false
  auth: {}, // 이거로 하면 헤더에 자동으로 Authorization에 들어감. 오버라이팅 됨. http 기본 인증
  proxy: {
    protocol: "http",
    host: "", // 유알ㅇ레
    port: 9000,
    auth: {
      // headers의 Proxy
      accToken: "",
      rfsToken: "",
    },
  },
})
// 응답 형태는 아래와 같이 온다.
const response = {
  data: {}, // 서버가 제공하는 응답
  status: {}, // HTTP 상태 코드
  statusText: "", // HTTP 상태 메세지
  headers: {}, // HTTP 헤더. 모든 헤더는 소문자이며 괄호 표기법으로 접근. res.headers["content-type"]
  config: {}, // 요청을 위해 axios가 제공하는 구성
  request: {}, // 이번 응답으로 생성된 요청. XMLHttpRequest.
}
