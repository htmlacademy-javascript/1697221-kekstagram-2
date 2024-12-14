// Проверяет длину строки

const compareLength = function (string, maxLength) {
  return (string.length <= maxLength);
};

compareLength ('Привет, мир', 40);


// Проверяет, вляется ли строка палиндромом

const isPalindrome = function (string) {
  const stringNormalized = string.toLowerCase().replaceAll(' ', '');
  let stringRevert = '';
  for (let i = stringNormalized.length - 1; i >= 0; i = i - 1) {
    stringRevert = stringRevert + stringNormalized[i];
  }
  return stringRevert === stringNormalized;
};

isPalindrome ('Лёша на полке клопа нашёл ');


// Извлекает числа из строки

const getNumber = function (string) {
  let number = '';
  for (let i = 0; i <= string.length - 1; i = i + 1) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      number = number + string[i];
    }
  }
  return parseInt(number, 10);
};

getNumber ('1 кефир, 0.5 батона');


//Функция на входе получает  отрицательное число, либо с дробной частью,
// а возвращает число состоящее только из цифр исходного ( -1.5 => 15 )

const transformNumber = function (number) {
  const numeric = number.toString().replace(/\D/g, '');
  return parseInt(numeric, 10);
};

transformNumber (-4.568);
