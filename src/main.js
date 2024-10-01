// Константы
const MIN_STR_LENGTH = 10;
const MAX_STR_LENGTH = 5000;
const CHARS = { 
  'cyrrilic': 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя', 
  'latin': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  'numbers': '1234567890',
  'special': '!@#$%^&*()_+-=[]{};:",.<>?/\\|`~'
};


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


// Слушатели

// Cлушатель нажатия кнопки "Выбрать все"
selectAll.addEventListener('click', () => {  
  cyrillic.checked = false;
  cyrillic.disabled = false;
  latin.checked = false;
  latin.disabled = false;
  numbers.checked = false;
  numbers.disabled = false;
  special.checked = false;
  special.disabled = false;

  if (selectAll.checked) {
    cyrillic.checked = true;
    cyrillic.disabled = true;
    latin.checked = true;
    latin.disabled = true;
    numbers.checked = true;
    numbers.disabled = true;
    special.checked = true;
    special.disabled = true;
  }
});


// Слушатель изменений поля длины строки
strLength.addEventListener('input', (event) => {
  strLength.classList.add('invalid');
  userData.hasValidLength = false;

  const value = Number(event.target.value);
  let isValid;

  if (!value) {
    strLengthError.textContent = 'Значение от 10 до 5000';
    isValid = false;
  } else if (value < MIN_STR_LENGTH) {
    strLengthError.textContent = `Минимальное значение: ${MIN_STR_LENGTH}`;
    isValid = false;
  } else if (value > MAX_STR_LENGTH) {
    strLengthError.textContent = `Максимальное значение: ${MAX_STR_LENGTH}`;
    isValid = false;
  } else {
    strLengthError.textContent = '';
    isValid = true;
  }

  if (isValid) {
    strLength.classList.remove('invalid');
    userData.hasValidLength = true;
    userData.strLength = value;
  }
});


// Слушатель изменений всей формы
form.addEventListener('input', () => {
  generateBtn.disabled = true;

  userData.hasChars = cyrillic.checked || latin.checked || numbers.checked || special.checked;

  if (userData.hasChars && userData.hasValidLength) {
    generateBtn.disabled = false;
  }
});


// Слушатель кнопки "Сгенерировать"
generateBtn.addEventListener('click', (event) => {
  event.preventDefault();

  let chars = '';

  if (cyrillic.checked) chars += CHARS['cyrrilic'];
  if (latin.checked) chars += CHARS['latin'];
  if (special.checked) chars += CHARS['special'];
  if (numbers.checked) chars += CHARS['numbers'];

  // Генерация строки
  let resultStr = '';

  for (let i = 0; i < userData.strLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    resultStr += chars[randomIndex];
  }

  checkIcon.style.display = 'none';
  copyIcon.style.display = 'inline';
  copyBtn.disabled = false;

  return result.textContent = resultStr;
});


// Слушатель нажатия кнопки "Скопировать"
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(result.innerText);
  copyIcon.style.display = 'none';
  checkIcon.style.display = 'inline';
});


// Слушатель нажатия кнопки "Сброс"
refreshBtn.addEventListener('click', () => {
  location.reload();
});
