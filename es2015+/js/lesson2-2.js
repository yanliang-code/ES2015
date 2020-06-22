// {
//   let a = 1;
//   console.log(a);
// }
// // console.log(a);

// var b = 3;
// let c = 4;
// console.log(b, c);
// console.log(window.b, window.c); //  window.c显示undefined

// var b = 4;
// console.log(b);

// let c = 9; // Uncaught SyntaxError: Identifier 'c' has already been declared
// var c = 9; // Uncaught SyntaxError: Identifier 'c' has already been declared
// console.log(c);

/*
总结
let声明的变量特性
    1.拥有块级作用域
    2.不能用全局变量window访问
    3.不存在变量提升
    4.不允许重复定义
*/

// ===================================================================

/*
总结
const具有let的所有特性，除此，它还有两个特性
    1.只能定义常量（定义后不可修改）
    2.声明时必须初始化
*/

// const a = 3;
// const a; // Uncaught SyntaxError: Missing initializer in const declaration
// a = 2; // Uncaught TypeError: Assignment to constant variable.
// console.log(a);

// 练习
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    // 输出3个3
    console.log(i);
  }, 1000);
}
// let变量不会提升，若为var，会打印undefined，因为变量提升，提前声明，但打印在赋值之前
console.log(a);
let a = 1;
