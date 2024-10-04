// Элементы страницы

// Вся форма
const form = document.getElementById('generate-form');


// Блок с радио
const dataTypes = document.getElementById('data-types');

// Радио
const stringType = document.getElementById('string-type');
const textType = document.getElementById('text-type');


// Чекбоксы
const selectAll = document.getElementById('select-all');
const cyrillic = document.getElementById('cyrillic');
const latin = document.getElementById('latin');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');


// Длина строки

// Сам input
const strLength = document.getElementById('str-length');
strLength.setAttribute('min', `${MIN_STR_LENGTH}`);
strLength.setAttribute('max', `${MAX_STR_LENGTH}`);
// Сообщение об ошибке
const strLengthError = document.getElementById('str-length-error');
// Сообщение при пустом инпуте
const strLengthEmpty = document.getElementById('str-length-empty');
strLengthEmpty.textContent = `Значение от ${MIN_STR_LENGTH} до ${MAX_STR_LENGTH}`;


// Кнопка "Сгенерировать"
const generateBtn = document.getElementById('generate-button');


// Результат
const result = document.getElementById('result');


// Вспомогательные кнопки
const copyBtn = document.getElementById('copy-button');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');
const refreshBtn = document.getElementById('reload-button');


// Данные пользователя
const userData = {
  dataType: 'string',
  hasChar: false,
  hasValidLength: false,
  strLength: 0
};
