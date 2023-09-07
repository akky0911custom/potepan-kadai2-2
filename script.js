let result = document.getElementById('result');
let temp = ''; //現在の値

//ACボタンの関数
function reset() {
  temp = ''
  result.textContent = '0';
};

//数字入力の関数
let number = val => { //押されたボタンの値 val()をアロー関数にしている
if (result.textContent === '0' && (val === '0' || val === '00')) {
  return; //最初の文字が0のとき0または00を押せなくする
  } else if (result.textContent.includes('.') && val === '.') {
    temp = '0.';　//少数点を連続で押せなくする
  } else if (result.textContent === '0' && (val !== '0' && val !== '.')) {
    temp = val;
    result.textContent = temp;
  } else if (result.textContent.length <= 14) {
    temp += val;
    result.textContent += val;
  }
};

//演算子入力の関数
let operator = val => {
  if (operator_last()) {
    result.textContent = result.textContent.slice(0, -1) + val;
  } else if (result.textContent.length <= 14) {
    temp = '';
    result.textContent += val;
  }
};

//イコール入力の関数
function calculate() {
  if (operator_last()) {
    result.textContent = result.textContent.slice(0, -1);
  }

  temp = new Function("return " + result.textContent)()

  if (temp.toString().length >= 16) {
    result.textContent = 'Error';
  } else {
  result.textContent = limitNum(temp);
  }
};

//小数点以下の桁数を揃える関数
function limitNum(num) {
  return Math.round(num*1000000000000)/1000000000000;
};

//一番最後に入力した値が演算子かを判定する関数
function operator_last() {
  return ['+','-','*','/'].includes(result.textContent.slice(-1));
};
