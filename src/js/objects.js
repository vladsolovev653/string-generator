// Элементы страницы

// Форма
const form = document.getElementById('generate-form');

// Чекбоксы
const selectAll = document.getElementById('select-all');
const cyrillic = document.getElementById('cyrillic');
const latin = document.getElementById('latin');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');

// Длина строки
const strLength = document.getElementById('str-length');
const strLengthError = document.getElementById('str-length-error');
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
const userData = {};
