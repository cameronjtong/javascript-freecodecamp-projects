function telephoneCheck(str) {
  let validNum = /^(1\s?)?(\d{3}|\(\d{3}\))[\-\s]?\d{3}[\-\s]?\d{4}$/
  return validNum.test(str)
}

telephoneCheck("555-555-5555");