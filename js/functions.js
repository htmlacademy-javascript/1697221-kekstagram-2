// Проверяет длину строки

const compareLength = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

compareLength ('Привет, мир', 40);


// Проверяет, вляется ли строка палиндромом

const isPalindrome = function (string) {
  const stringNormalized = string.replaceAll(' ', '');
  let stringRevert = '';

  for (let i = stringNormalized.length - 1; i >= 0; i = i - 1) {
    stringRevert = stringRevert + stringNormalized[i];
  }

  if (stringRevert.toLowerCase() === stringNormalized.toLowerCase()) {
    return true;
  }
  return false;
};

isPalindrome ('Лёша на полке клопа нашёл ');


// Извлекает числа из строки

const getNumber = function (string) {
  let number = '';
  for (let i = 0; i <= string.length - 1; i = i + 1) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      number = number + parseInt(string[i], 10);
    }
  }
  return parseInt(number, 10);
};

getNumber ('1 кефир, 0.5 батона');


// Преобразует число в целое положительное

const transformNumber = function (number) {
  const string = String(number);
  let numeric = '';
  for (let i = 0; i <= string.length - 1; i = i + 1) {
    if (Number.isInteger(parseInt(string[i], 10))) {
      numeric = numeric + string[i];
    }
  }
  return parseInt(numeric, 10);
};

transformNumber ();
