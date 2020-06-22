const a = 20;
const b = 10;
const c = 'js';

const str = 'my age is ' + (a + b) + ' i love ' + c; // ES5:字符串拼接

const str1 = `my age is ${a + b} i love ${c}`; // ES6：字符串模板

console.log('str===', str);
console.log('str1===', str1);

// ==========================================================

// ES5
// const retailPrice = 20;
// const wholeSalePrice = 16;
// const type = 'retail';
// let showTxt = '';
// if (type === 'retail') {
//   showTxt = '你此次购买的单价：' + retailPrice;
// } else {
//   showTxt = '你此次购买的批发价：' + wholeSalePrice;
// }
// console.log(showTxt);

// ES6
// 字符串模板结合函数使用(Tag函数)
// 入参两种：字符串模板的常量、变量
// 第一个入参：常量(数组，内部存储的是被变量分割的常量)  第二个入参到第n个对应着n个变量
function Price(strings, type) {
  let str1 = strings[0],
    showTxt;
  const retailPrice = 20;
  const wholeSalePrice = 16;
  if (type === 'retail') {
    showTxt = '购买单价：' + retailPrice;
  } else {
    showTxt = '购买批发价：' + wholeSalePrice;
  }
  return `${str1}${showTxt}`;
}

let showTxt = Price`您此次的${'retail'}`; // Price：函数名； 您此次的${'retail'}`：函数入参
console.log(showTxt);

// =================================================

// 换行
// ES5
let s1 = '我是第一行' + '\n' + '我是第二行';
console.log(s1);

// ES6(可自动识别换行符)
let s2 = `我是第一行

我是第二行`;
console.log(s2);

/*
    课外阅读：
        1.模板字符串
        2.Getting Literal With ES6 Template Strings
        3.A guide to JavaScript Template Literal
    练习：
        1.用Tag函数解决下你业务中的一个字符串模板的问题
*/
