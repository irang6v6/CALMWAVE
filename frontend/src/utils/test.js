import axios from "axios"

const test = function () {
  axios({
    method: "get",
    url: "https://dog.ceo/api/breadsfeds/asdimage/rasdanasasdfaddfsdfadomasd",
  })
    .then((res) => {
      console.log("성공1")
    })
    .catch(async (err) => {
      console.log("에러 1")
      return axios({
        method: "get",
        url: "https://dog.ceo/api/breeds/image/random",
      })
        .then((res) => {
          console.log("성공2", res)
          return res
        })
        .catch((err) => {
          return err
        })
    })
    .catch((err) => {
      console.log("에러 2")
    })
}

export default test
