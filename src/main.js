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
const form = document.getElementById('generate-form');
const selectAll = document.getElementById('select-all');
const cyrillic = document.getElementById('cyrillic');
const latin = document.getElementById('latin');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');
const strLength = document.getElementById('string-length');
const generateBtn = document.getElementById('generate-button');
const result = document.getElementById('result');
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


// Слушатель поля с длиной строки
strLength.addEventListener('input', () => {
  userData.strLength = Number(strLength.value);

  if (userData.strLength < MIN_STR_LENGTH || userData.strLength > MAX_STR_LENGTH) {
    userData.strLength = false;
  }
});


// Слушатель изменений в форме
form.addEventListener('input', () => {
  generateBtn.disabled = true;

  userData.hasChars = cyrillic.checked || latin.checked || numbers.checked || special.checked;

    if (userData.hasChars && userData.strLength) {
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
