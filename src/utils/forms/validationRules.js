/* 검증 항목과 검증 방법들의 js 파일 */

const validation = (value, rules, form) => {
  let valid = true;

  // 검증 항목들
  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        break;
      case 'minLenght':
        valid = valid && validateMinLenght(value, rules[rule]);
        break;
      case 'confirmPassword':
        valid =
          valid &&
          validateConfirmPassword(value, form[rules.confirmPassword].value);
        break;
      default:
        valid = true;
    }
  }

  return valid;
};

/**
 * 패스워드가 첫 번째 입력한 값이랑 동일한지 리턴해주는 함수
 * @param {string} confirmPassword 재입력 패스워드
 * @param {string} password 첫 번째(기본) 패스워드
 * @returns 두 개의 비밀번호가 같은 지 확인하여 true, false 값을 반환해줌
 */
const validateConfirmPassword = (confirmPassword, password) => {
  return confirmPassword === password;
};

const validateMinLenght = (value, ruleValue) => {
  if (value.length >= ruleValue) return true;
};

const validateEmail = value => {
  // email 형식을 판단하기 위한 문자열
  const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // test: 주어진 정규문자열이 맞는지 확인하는(포함되어 있는지) 내장함수. string 값으로 가져와야되서 타입 강제변환
  return expression.test(String(value).toLocaleLowerCase());
};

const validateRequired = value => {
  if (value !== '') return true; // value 값이 공백이 아니면 true를 반환
  return false;
};

export default validation;
