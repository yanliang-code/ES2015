// 1.函数外部定义的变量是全局变量（默认挂载到window上）
// var abc = 1234;
// bbb = 666;

// 2.全局变量是不能删除的，全局的属性是可以删除
// delete window.abc; // 返回值：false，此变量还存在
// delete window.bbb; // 返回值：true，此属性被移除

// 3.不使用var定义的变量，不管是否在函数内部还是外部，都以属性的方式挂载到全局变量上
// function test() {
//   ab = 45;
// }
// test();

// =======================================================================================

// 1.函数作用域：让变量屏蔽在函数内，外部无法得知也无从访问(函数是一堵墙)
// function test() {
//   var a = 3;
//   if (a === 3) {
//     // var声明的变量会有变量提升的效果，只要检测到声明var变量并赋值,会自动在var a=3下通过var b;来进行声明；
//     // 下面进行给b赋值4的操作（JS引擎会为你做这一步，这样操作之后，也就没有块作用域的效果）
//     // 解决方法：使用let进行声明，无变量提升的情况，拥有块级作用域
//     let b = 4; // 块（花括号）无法形成墙
//     console.log('abc');
//   } else {
//     console.log('abcd');
//   }
//   console.log(b);
//   return a + 4;
// }
// console.log(test());
// console.log(a); // 外部无法访问函数内部的值
// 2.让外部能访问内部值的方法： return返回，闭包返回
// 闭包的例子
// function bbb() {
//   var n = 3; // bbb函数内，无法向下找到m。因为函数的作用域只能向上找
//   function inc() {
//     var m = 4;
//     return n + m; //inc函数内，可以向上找到n；
//   }
//   return inc;
// }
// var c = bbb(); // inc函数的指向
// console.log(c()); //执行inc函数
// console.log(c()); //执行inc函数

// =====================================

// 动态作用域
window.a = 3;
function test() {
  console.log(this.a);
}
test();
test.bind({ a: 100 })();

/*
总结
作用域情况：
    全局、函数、块状、动态
*/
