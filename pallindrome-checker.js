function palindrome(str) {
  let specialCharacterRegex = /[^A-Za-z0-9]/gi
  str = str.toLowerCase().replace(specialCharacterRegex, "");
  let leftIndex = 0
  let rightIndex = str.length -1
  while((str.length/2) > leftIndex){
    if(str[leftIndex] !== str[rightIndex]){
      return false
    }
    leftIndex++;
    rightIndex--;
  }
  return true
}

palindrome("almostomla");