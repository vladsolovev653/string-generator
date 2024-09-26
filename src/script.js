// Константы
const MIN_STR_LENGTH = 10;
const MAX_STR_LENGTH = 5000;
const CHARS = { 
  'cyrrilic': 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя', 
  'latin': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  'numbers': '1234567890',
  'special': '!@#$%^&*()_+-=[]{};:",.<>?/\\|`~'
}

// Форма с данными для генерации
const form = document.getElementById('generate-form');
const cyrillic = document.getElementById('cyrillic');
const latin = document.getElementById('latin');
const numbers = document.getElementById('numbers');
const special = document.getElementById('special');
const strLength = document.getElementById('string-length');
const selectAll = document.getElementById('select-all');

// Блок с результатом
const result = document.getElementById('result');

// Вспомогательные кнопки
const copyBtn = document.getElementById('copy-button');
const refreshBtn = document.getElementById('reload-button');


// Cлушатель нажатия кнопки "Выбрать все"
selectAll.addEventListener('click', () => {
  cyrillic.checked = false;
  cyrillic.disabled = false;
  latin.checked = false;
  latin.disabled = false;
  special.checked = false;
  special.disabled = false;
  numbers.checked = false;
  numbers.disabled = false;

  if (selectAll.checked) {
    cyrillic.checked = true;
    cyrillic.disabled = true;
    latin.checked = true;
    latin.disabled = true;
    special.checked = true;
    special.disabled = true;
    numbers.checked = true;
    numbers.disabled = true;
  }
});


// Слушатель нажатия кнопки "Сгенерировать"
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let resultStr = '';
  const lengthNumber = Number(strLength.value);

  let chars = '';

  if (cyrillic.checked) chars += CHARS['cyrrilic'];

  if (latin.checked) chars += CHARS['latin'];

  if (special.checked) chars += CHARS['special'];
  
  if (numbers.checked) chars += CHARS['numbers'];

  if (!chars) {
    copyBtn.disabled = true;
    return result.innerText = 'Не выбраны символы';
  }

  if (lengthNumber < MIN_STR_LENGTH) {
    copyBtn.disabled = true;
    return result.innerText = `Минимальная длина строки: ${MIN_STR_LENGTH}`;
  }

  if (lengthNumber > MAX_STR_LENGTH) {
    copyBtn.disabled = true;
    return result.innerText = `Максимальная длина строки: ${MAX_STR_LENGTH}`;
  } 

  for (let i = 0; i < lengthNumber; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    resultStr += chars[randomIndex];
  }

  copyBtn.disabled = false;
  return result.textContent = resultStr;
});


// Слушатель нажатия кнопки "Скопировать"
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(result.innerText);
  copyBtn.disabled = true;
});


// Слушатель нажатия кнопки "Сброс"
refreshBtn.addEventListener('click', () => {
  location.reload();
});
