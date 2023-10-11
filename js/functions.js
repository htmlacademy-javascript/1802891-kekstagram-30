const cheakLengthString = (string, length) => string.length <= length;

const isPalindrome = (rawString) => {
  const normalizeString = rawString.toLowerCase().replaceAll(' ', '');
  let comparisonString = '';
  for(let i = normalizeString.length - 1; i >= 0; i--) {
    comparisonString += normalizeString[i];
  }
  return normalizeString === comparisonString;
};

const findNumbersAtString = (string) => {
  const value = string.toString();
  let result = '';
  for (let i = 0; i < value.length; i++){
    if(!(isNaN(parseInt(value[i], 10)))){
      result += value[i];
    }
  }
  return (result !== '') ? result : NaN;
};

