// const arr = [1, 2, 3, 4, 5, 6, 7];
let a = { a: 1 };
const arr = [a, { a: 2 }, { a: 3 }, { a: 4 }];
// es6: find  findIndex
// es7: includes
// 引用类型需要指定地址一致
// console.log(arr.includes(a));

// 计算指定数的指定次方
// 原写法
console.log(Math.pow(2, 6));
// es7写法：原写法的简写
console.log(2 ** 6);
