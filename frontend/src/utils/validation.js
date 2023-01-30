/**
 * 영어 체크용
 */
/* eslint-disable */
const engCheck = /[a-z]/

/* eslint-disable */
const upperCheck = /[A-Z]/

/**
 * 숫자 체크용
 */
/* eslint-disable */
const numCheck = /[0-9]/

/**
 * 특문 체크용
 */
const speCheck = /[~!@#$%^&*()_+|<>?:{}\[\]\\'"]/

/**
 * @설명 ID 값을 받아서 유효성을 object 형태로 반환. object 내에는 status, message 값 제시.
 * @조건 4자 이상 16자 이하, 공백/특수문자 없을 경우 true
 * @파라미터 `val` : string
 * @반환값 {object} {`status` : boolean, `message` : string}
 */
function idValidation(val) {
  if (val.trim().length < 4 || val.trim().length > 16) {
    return {
      status: false,
      message:
        "ID의 길이가 유효하지 않습니다. 4자 이상 16자 이하의 값을 입력해주세요.",
    }
  } else if (val.search(/\s/ !== -1)) {
    return {
      status: false,
      message: "ID에 공백은 허용되지 않습니다. 공백을 제외하고 입력 해주세요.",
    }
  } else if (speCheck.test(val)) {
    return {
      status: false,
      message:
        "ID에 특수문자는 허용되지 않습니다. 특수문자를 제외하고 입력 해주세요.",
    }
  } else {
    return { status: true, message: "유효한 ID 입니다." }
  }
}

/**
 * PW 값을 받아서 유효성을 true/false로 반환
 * @param {string} val 패스워드
 * @returns {boolean}
 */
// function passwordValidation(val) {
//   if (val.trim().length < 8 || val.trim().length > 16) {
//     return {
//       status: false,
//       message:
//         "PW의 길이가 유효하지 않습니다. 8자 이상 16자 이하의 값을 입력해주세요.",
//     }
//   } else if (val.search(/\s/) !== -1) {
//     return {
//       status: false,
//       message: "PW에 공백은 허용되지 않습니다. 공백을 제외하고 입력 해주세요.",
//     }
//   } else if (!speCheck.test(val)) {
//     return {
//       status: false,
//       message:
//         "PW에 특수문자는 필수입니다. 특수문자를 사용하여 PW를 설정 해주세요.",
//     }
//   } else {
//     return { status: true, message: "유효한 PW 입니다." }
//   }
// }

/**
 * email 값을 받아서 유효성을 true/false로 반환
 * @todo 받는 이메일 형태의 validation은 가능하나, 서버 실제 유효성 검사를 해줘야 한다.
 * @param {string} val 이메일
 * @returns {boolean}
 */

// function emailValidation(email) {
//   if (email.trim().length === 0) {
//     return { status: false, message: "이메일은 필수 입력란입니다." }
//   } else if (!email.includes("@") || !email.includes(".")) {
//     return { status: false, message: "이메일 형태로 입력 바랍니다." }
//   } else {
//     return { status: true, message: "유효한 Email 입니다." }
//   }
// }

function emailValidation(email) {
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  if (email.trim().length === 0) {
    return { status: false, message: "이메일은 필수 입력 값입니다." }
  }
  if (email !== "" && email !== undefined && regex.test(email)) {
    return { status: true, message: "유효한 이메일입니다." }
  }
  return { status: false, message: "유효하지 않은 이메일 형식입니다." }
}

function passwordValidation(val) {
  if (val.trim().length === 0) {
    return { status: false, message: "비밀번호는 필수 입력란입니다." }
  }
  if (!speCheck.test(val)) {
    return { status: false, message: "특수문자를 포함해야 합니다." }
  } else if (!numCheck.test(val)) {
    return { status: false, message: "숫자를 포함해야 합니다." }
  }
  const passwordRules = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/
  if (passwordRules.test(val)) {
    return { status: true, message: "유효한 비밀번호입니다." }
  }
  return { status: false, message: "유효하지 않은 비밀번호입니다." }
}

function nicknameValidation(val) {
  if (val.trim().length === 0) {
    return { status: false, message: "닉네임은 필수 입력란입니다." }
  }
  const nicknameRules = /^([a-zA-Z0-9가-힣]).{1,8}$/
  if (nicknameRules.test(val)) {
    return { status: true, message: "유효한 닉네임 입니다." }
  }
  return { status: false, message: "유효하지 않은 닉네임입니다." }
}

export { idValidation, passwordValidation, emailValidation, nicknameValidation }
