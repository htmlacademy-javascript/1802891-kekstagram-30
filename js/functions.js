const cheakLengthString = function (string, length) {
  return string.length <= length;
};

const checkPalindrome = function (line) {
  const normalizeString = line.toLowerCase().replaceAll(' ', '');
  let comparisonString = '';
  for(let i = normalizeString.length - 1; i >= 0; i--) {
    comparisonString += normalizeString[i];
  }
  return normalizeString === comparisonString;
};

const findNumbers = function (string) {
  const value = string.toString();
  let result = '';
  for (let i = 0; i < value.length; i++){
    if(!(isNaN(parseInt(value[i], 10)))){
      result += value[i];
    }
  }
  return (result !== '') ? result : NaN;
};

