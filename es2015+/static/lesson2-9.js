// ES5
let arr = ['hello', 'world'];
// 频繁使用复杂数据中的某个值时，使用变量缓存存储，防止每次通过索引获取值，耗费性能
let firstName = arr[0]; // 频繁声明变量，通过索引取值
let surName = arr[1]; // 频繁声明变量，通过索引取值
console.log(firstName);
// ES6
let arr1 = ['hello', 'world'];
// 解构赋值：讲数据拆解开，分别赋值
let [firstName1, surName1] = arr1;
console.log(firstName1, surName1);

// ========================================
// Array Object
let arr2 = ['a', 'b', 'c', 'd'];
// let arr2 = 'abcd';
// let arr2 = new Set([1, 2, 3, 4]);
// arr2：可遍历的数据解构，set、map、array、object、string、collection、nodelist
let [first, , third, , tt = 0] = arr2; // 不想取值的位置直接跳过
console.log(first, third, tt);

let user = { name: 's', surname: 't' };
// ES5给对象的属性赋值
// user.name = arr2[0]
// user.surname = arr2[1]
// ES6给对象属性赋值(已声明的变量)
[user.name, user.surname] = arr2;
console.log('user===', user);
console.log(Object.entries(user));
// 循环中使用解构赋值
for (const [k, v] of Object.entries(user)) {
  // 隐式索引，显示索引arr[1]
  console.log(k, v);
}
let arr3 = [1, 2, 3, 4, 5, 6, 7, 8];
let [a, b, ...c] = arr3;
console.log(a, b, c);
let arr4 = [];
let [a1, b1, ...c1] = arr4; // 数据无值，存在自动默认值undefined、undefined、[]
console.log(a1, b1, c1);

let options = {
  title: 'menu',
  //   width: 100,
  height: 200,
};
// title2指定赋值的变量名；width设置默认值
let { title: title2, width = 130, height } = options;
console.log(title2, width, height);

// 只获取指定数据，对象上其余数据一起存储在一个变量上
let options1 = {
  title: 'menu',
  width: 100,
  height: 200,
};
let { title, ...last } = options1;
console.log(title, last);

// 有可能后台返回的数据不是扁平数据，含有多个层级的
let options2 = {
  size: {
    width1: 100,
    height1: 200,
  },
  items: ['cake', 'donut'],
  extra: true,
};
let {
  size: { width1 },
  items: [, item2],
} = options2;
console.log(width1, item2);

/*
    阅读：
        1.Destructuring Assignment
        2.ES6 JavaScript Destructuring in Depth
        3.解构赋值
    练习：
        1.一个函数需要传入很多参数，是否可以利用解构赋值来简化操作
        2.如何在业务开发中对接口数据进行解构赋值
*/

function add({ firstNum, secondNum }) {
  return firstNum + secondNum;
}
let params = {
  firstNum: 10,
  secondNum: 20,
};
console.log(add(params));
