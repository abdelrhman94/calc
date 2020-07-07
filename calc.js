let runningTotal = 0;
let buffer = '0';
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(value) {
  switch (value) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '&equals;':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = +runningTotal;
      runningTotal = 0;
      break;
    case '&larr;':
      if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '&plus;':
    case '&minus;':
    case '&times;':
    case '&divide;':
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  if (buffer === '0') {
    return;
  }

  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (perviousOperator === '&plus;') {
    runningTotal += intBuffer;
  } else if (perviousOperator === '&minus;') {
    runningTotal -= intBuffer;
  } else if (perviousOperator === '&times;') {
    runningTotal *= intBuffer;
  } else {
    perviousOperator === '&divide;';
    runningTotal /= intBuffer;
  }
}
function handleNumber(value) {
  if (buffer === '0') {
    buffer = value;
  } else {
    buffer += value;
  }
}

function init() {
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
