const cheakingLengthString = (string, length) =>
  string.length <= length ? true : false;

const checkingPalindrome = function (line) {
  const normalizeString = line.toLowerCase().replaceAll(' ', '');
  let comparisonString = '';
  for(let i = normalizeString.length - 1; i >= 0; i--) {
    comparisonString += normalizeString[i].at();
  }
  return (normalizeString === comparisonString) ? true : false;
};

const findingNumbers = function (string) {
  const value = string.toString();
  let result = '';
  for(let i = 0; i < value.length; i++){
    if(!(isNaN(parseInt(value[i], 10)))){
      result += value[i];
    }
  }
  return (result !== '') ? result : NaN;
};


