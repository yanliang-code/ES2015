// ES5 参数默认值
// 缺点：代码逻辑啰嗦、冗余、修改起来比较复杂
// x必写 y、z可写
function f(x, y, z) {
  console.log(Array.from(arguments)); // 执行函数时的入参个数
  // 处理参数缺省的情况
  if (y === undefined) {
    y = 7;
  }
  if (z === undefined) {
    z = 42;
  }
  return x + y + z;
}
console.log(f(1));
console.log(f(1, 8));
console.log(f(1, 8, 43));

// ES6
// 形参处设置默认值，比如：常量、其他参数的表达式（无默认值的写在前面，有默认值的写在后面）
function f1(x, y = 7, z = 42) {
  return x + y + z;
}
function f2(x, y = 7, z = x + y) {
  // ES6中禁用arguments获取参数个数 ，那么替换方案呢？？？？ 见下方
  // 使用函数名的length属性可以获取到没有默认值的入参个数（获取的是定义时没有默认值的入参个数，不是执行时的入参个数）
  console.log('f2===', f2.length);
  return x * 10 + z;
}
console.log(f1(1));
console.log(f1(1, 8));
console.log(f1(1, 8, 43));
console.log(f1(1, undefined, 43)); //只想第二个参数式默认值，不过不可以省略不写，只能写undefined
console.log(f2(1, undefined, 2)); //12 y使用默认值，不过return值没有使用y值
console.log(f2(1)); // 18 y、z都是用默认值，z就等于8
console.log(f2(1, 9)); // 20
console.log(f2(1, 9, 2, 1)); // 20

// =========================================================
console.log('=====================================');

// 对输入的所有参数进行相加（函数入参个数不确定的处理方法）
// ES5
function sum() {
  let num = 0;
  Array.prototype.forEach.call(arguments, function (item) {
    num += item * 1;
  });
  //   Array.from(arguments).forEach((item) => {
  //     num += item * 1; //* 1 转换为数字
  //   });
  return num;
}
console.log(sum(1, 2, 3));

// ES6
// rest 参数  ===  ...rest   所有入参全部放入rest变量
// base, ...rest === 第一个入参赋值给base，其余入参放入rest
function sum1(base, ...rest) {
  let num = 0;
  rest.forEach((item) => {
    num += item * 1;
  });
  return base * 2 + num;
}
console.log(sum1(1, 2, 3)); // 分散 -> 收缩

/*
ES5:
1.无法给函数入参设置默认值，只能通过判断是否undefined来设置默认值（多了许多无意义代码）
2.获取入参以及个数使用arguments（伪数组collection）获取
函数入参设置默认值（ES6）
1.函数名的length：获取函数定义时无默认值的入参个数
2.rest参数：获取函数执行时的入参，获取后的变量为数组
3.可将确定的入参放入前几个指定变量中，其余不确定的入参放入rest参数内
*/

// ===========================================================
console.log('================================================');

function sum2(x = 1, y = 2, z = 3) {
  return x + y + z;
}
let data = [4, 5, 6];
// ES5
console.log(sum2(data[0], data[1], data[2]));
console.log(sum2.apply(this, data)); //call 挨个传参；apply 传入一个数组
console.log(sum2(...data)); //

/*
剩余操作符和展开操作符的表示方式一样，都是三个点 '…',但是他们的使用场景会不同。
1.展开操作符会”展开“数组编程多个元素，（调用者是一个数据集合，函数入参是分散的变量） spread操作
2.剩余操作符会把多个元素压缩成一个单一的元素。（调用者是分散的变量，函数入参是一个数据集合） rest操作
*/

// ===================================================================
console.log('==========================================================');
// function hello(){}
// let hello = function(){}
// 什么情况()能省略：只有一个入参时
// 什么情况{}能省略：1.返回的值是表达式的运算结果 2.返回的是对象，不过需要加上()，否则会出现误把花括号当作函数执行体
let hello = (name) => {
  console.log('hello world', name);
};
hello('hahah');

let test = {
  name: 'test',
  //   say: function(){
  //     console.log(this.name);
  //   },
  say: () => {
    console.log(this.name, this);
  },
};
test.say(); //test (this指向调用者)

// ES5普通函数：运行时决定this指向； ES6箭头函数：定义时决定this指向

/*
总结：
    1.默认值
    2.不确定参数
    3.箭头函数
*/

// 如何用箭头函数来实现一个数组排序的问题（使用sort，用箭头函数简化一下，不会吧？？）
// 箭头函数对this的处理还有什么妙用
