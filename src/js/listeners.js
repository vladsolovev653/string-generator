// Слушатели


// Слушатель блока с типами данных
dataTypes.addEventListener('change', () => {
  generateBtn.disabled = true;

  selectAll.checked = false;
  selectAll.disabled = false;

  cyrillic.checked = false;
  cyrillic.disabled = false;
  
  latin.checked = false;
  latin.disabled = false;
  
  numbers.checked = false;
  numbers.disabled = false;
  
  special.checked = false;
  special.disabled = false;

  strLength.value = '';
  strLengthEmpty.style.display = 'inline';
  strLengthError.style.display = 'none';
  strLength.classList.remove('invalid');
  strLengthEmpty.textContent = `Значение от ${MIN_STR_LENGTH} до ${MAX_STR_LENGTH}`;

  userData.hasValidLength = false;
  userData.hasChar = false;
  userData.dataType = 'string';

  if (textType.checked) {
    selectAll.disabled = true;
    numbers.disabled = true;
    special.disabled = true;
    userData.dataType = 'text';
  }
});


// Cлушатель нажатия кнопки "Выбрать все"
selectAll.addEventListener('click', () => {  
  if (userData.dataType === 'string') {
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
  } 
});


// Слушатель кнопки Кириллица, если тип = текст
cyrillic.addEventListener('click', () => {
  if (userData.dataType === 'text') {
    latin.disabled = cyrillic.checked;
  }
});


// Слушатель кнопки Латиница, если тип = текст
latin.addEventListener('click', () => {
  if (userData.dataType === 'text') {
    cyrillic.disabled = latin.checked;
  }
});


// Слушатель изменений поля длины строки
strLength.addEventListener('input', (event) => {
  let isValid = false;

  let value = Number(event.target.value);

  if (!value) {
    // console.log(`${value} НЕ является числом`);
    event.target.value = '';
    strLengthEmpty.style.display = 'inline';
    strLengthError.style.display = 'none';
    strLength.classList.remove('invalid');
    strLengthEmpty.textContent = `Значение от ${MIN_STR_LENGTH} до ${MAX_STR_LENGTH}`;
  } else {
    // console.log(`${value} является числом`);
    if (!Number.isInteger(value)) {
      // console.log(`${value} НЕ целое число`);
      event.target.value = Math.round(value);
      value = event.target.value;
    }

    if (value < MIN_STR_LENGTH) {
      // console.log(`${value} меньше ${MIN_STR_LENGTH}`);
      strLengthEmpty.style.display = 'none';
      strLengthError.style.display = 'inline';
      strLength.classList.add('invalid');
      strLengthError.textContent = `Минимальное значение: ${MIN_STR_LENGTH}`;
    } else if (value > MAX_STR_LENGTH) {
      // console.log(`${value} больше ${MAX_STR_LENGTH}`);
      strLengthEmpty.style.display = 'none';
      strLengthError.style.display = 'inline';
      strLength.classList.add('invalid');
      strLengthError.textContent = `Максимальное значение: ${MAX_STR_LENGTH}`;
    } else {
      // console.log(`${value} валиден`);
      isValid = true;
      strLengthEmpty.style.display = 'none';
      strLengthError.style.display = 'none';
      strLength.classList.remove('invalid');
    }
  } 
  
  userData.hasValidLength = isValid;
  userData.strLength = value;

  // console.log(userData);
});


// Слушатель изменений всей формы
form.addEventListener('input', () => {
  generateBtn.disabled = true;

  userData.hasChar = cyrillic.checked || latin.checked || numbers.checked || special.checked;

  // console.log(`
  //   Данные пользователя: 
  //   Выбрать все: ${selectAll.checked}
  //   Кириллица: ${cyrillic.checked}
  //   Латиница: ${latin.checked}
  //   Цифры: ${numbers.checked}
  //   Спецсимволы: ${special.checked}
  //   Длина строки: ${userData.strLength}
  // `);

  if (userData.hasChar && userData.hasValidLength) {
    generateBtn.disabled = false;
  }
});


// Слушатель кнопки "Сгенерировать"
generateBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
  copyIcon.style.display = 'inline';
  checkIcon.style.display = 'none';
  copyBtn.disabled = false;

  let resultStr = '';

  if (!userData.hasChar || !userData.hasValidLength) {
    resultStr = 'Что-то пошло не так';
  } else {
    // Если тип = строка
    if (userData.dataType === 'string') {
      // Генерация строки
      let chars = '';

      if (cyrillic.checked) chars += CHARS['cyrrilic'];
      else if (latin.checked) chars += CHARS['latin'];
      else if (special.checked) chars += CHARS['special'];
      else if (numbers.checked) chars += CHARS['numbers'];

      for (let i = 0; i < userData.strLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        resultStr += chars[randomIndex];
      }
    // Если тип = текст
    } else if (userData.dataType === 'text') {
      // Генерация текста
      let text = '';

      if (cyrillic.checked) text += TEXT['cyrrilic'];
      else if (latin.checked) text += TEXT['latin'];

      console.log(text);
      console.log(userData.strLength);
      console.log(text.length);

      if (userData.strLength > text.length) {
        do {
          text += text;
        } while (userData.strLength > text.length)
      }

      text = text.slice(0, userData.strLength);

      if (text.slice(-1) === ' ') {
        text = text.replace(' ', '.');
      }
      
      resultStr = text;
    }
  }

  if (resultStr.length !== userData.strLength) {
    throw new Error(`Ожидаемая длина: ${userData.strLength}, фактическая: ${resultStr.length}`);
  }

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
