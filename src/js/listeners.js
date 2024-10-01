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
  let isValid = false;

  const value = Number(event.target.value);

  if (!value) {
    strLengthEmpty.style.display = 'inline';
    strLengthError.style.display = 'none';
    strLength.classList.remove('invalid');
    strLengthEmpty.textContent = `Значение от ${MIN_STR_LENGTH} до ${MAX_STR_LENGTH}`;
  } else if (value < MIN_STR_LENGTH) {
    strLengthEmpty.style.display = 'none';
    strLengthError.style.display = 'inline';
    strLength.classList.add('invalid');
    strLengthError.textContent = `Минимальное значение: ${MIN_STR_LENGTH}`;
  } else if (value > MAX_STR_LENGTH) {
    strLengthEmpty.style.display = 'none';
    strLengthError.style.display = 'inline';
    strLength.classList.add('invalid');
    strLengthError.textContent = `Максимальное значение: ${MAX_STR_LENGTH}`;
  } else {
    isValid = true;
    strLengthEmpty.style.display = 'none';
    strLengthError.style.display = 'none';
    strLength.classList.remove('invalid');
  }

  userData.hasValidLength = isValid;
  userData.strLength = value;
});


// Слушатель изменений всей формы
form.addEventListener('input', () => {
  generateBtn.disabled = true;

  userData.hasChar = cyrillic.checked || latin.checked || numbers.checked || special.checked;

  if (userData.hasChar && userData.hasValidLength) {
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
