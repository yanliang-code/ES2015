// ES5 中数组遍历有多少种方法（优势与缺点）
const arr = [1, 2, 3, 4, 5];
// for 循环(ES4)
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    // break;
    continue;
  }
  //   console.log(arr[i]);
}
// forEach (ES5)(不支持break与continue，必须每个元素都要遍历到)
arr.forEach(function (item) {
  if (item === 2) {
    // break; // Uncaught SyntaxError: Illegal break statement
    // continue; // Uncaught SyntaxError: Illegal continue statement: no surrounding iteration statement
  }
  //   console.log(item);
});
// every(ES5)：每次需要返回值，若返回值为false，遍历停止；为true，遍历继续。没有return值时，默认返回false
arr.every(function (item) {
  // 模仿break
  //   if (item === 2) {
  //     return false;
  //   }
  //   console.log(item);
  //   return true;
  // 模仿continue
  if (item === 2) {
  } else {
    // console.log(item);
  }
  return true;
});
// for in(ES5)：是为遍历对象设计的，虽然可以遍历数组，但是有瑕疵
// 数组也是对象，数组是可遍历的
// arr.a = 8; // 数组也是对象，所以可通过.的方式添加属性，由于for in 是为对象设定的，所以，它也会把属性也遍历出来(瑕疵)
for (const key in arr) {
  if (key == 2) {
    // for in 出来的是字符串，所以需要把三等改为双等，或者改为key * 1 === 2
    // continue;
    break;
  }
  //   console.log(key, arr[key]);
}
// 注意：chrome控制台上，灰色的：字符串  蓝色的：数值

// ============================================================

// for of(ES6)
// 判断一个变量是否能遍历，不能通过是否为数组、对象判断
// 有些结构和数组、对象不一致，但是它还能被遍历
// ES6 添加 for of 的原因
// every、forEach、for循环专门针对数组的遍历，for in专门针对Object，
// 那么其他结构的变量循环就要使用for of(对自定义赋值结构，指定定义规则)
for (const item of arr) {
  console.log(item);
}

const Price = {
  A: [1.5, 2.3, 4.5],
  B: [3, 4, 5],
  C: [0.5, 0.8, 1.2],
};

for (const key in Price) {
  console.log(key, Price[key]);
}

// ===========================================================

// 如何将伪数组转换成一个新数组
// 伪数组：argumens(collection) 、dom集合(nodelist)
// 伪数组特点：具备数组的特性（有长度、可遍历）；但不能调用数组的API

// ES5
// let args1 = [].slice.call(arguments); // Collection -> array
// let imgs1 = [].slice.call(document.querySelectorAll('img')); // NodeList -> array

// ES6 (Array.prototype.from)
// let args2 = Array.from(arguments);
// let imgs2 = Array.from(document.querySelectorAll('img'));

// 初始化含有5个1的数组
// 方法1：
let array = Array(5);
// 为什么forEach循环内部给元素赋值无效
// array.forEach((item) => {
//   // 无效
//   item = 1;
// });
for (let i = 0, len = array.length; i < len; i++) {
  array[i] = 1;
}
console.log(array);

// 方法2：
// 伪数组具体解析：1.按照索引方式存储数据  2.具备length属性  {0:'q',1:'w',length:2}
// Array.from(arrayLike, mapFn, thisArg) 将类数组转换为数组，并且具有map替换元素的功能(可改变this指向，默认windows)
let array1 = Array.from(
  { length: 5 },
  function () {
    console.log('this==', this);
    return 1;
  },
  { 1: 2 }
);
console.log('array1===', array1);

// ====================================================================

// 创建新数组
// ES5（前两种只能搭配后期循环赋值）
// 1.let array3 = Array(5); //生产长度为5的数组，元素为空empty
// console.log(array3);
// 2.let array3 = ['', '', '', '', '']; //生产长度为5的数组，元素为空字符串
// console.log(array3);
// 3.使用数组字面量  let array = []; 生成数组对象，内部会调用new

// ES6
// 1.Array.from使用第二个参数实现（参考上面：类数组结合map实现）
// 2.Array.prototype.of 默认ES5是生产一个数组，挨个push，ES6的of方法就可以免去挨个push的烦恼
// let array3 = Array.of(1, 2, 8, 4, 5); //构造函数内的方法
// console.log(array3);
// 3.Array.prototype.fiil 填充
// let array3 = Array(5).fill(4);
// console.log(array3);
// Array.fill(value,start,end) 默认start是数组开始位置，end数组结束位置(左包含，右不包含)（可用于替换数组的某块区域）
// let array3 = [1, 2, 3, 4, 5, 6];
// console.log(array3.fill(8, 2, 4)); //原型上的方法

// ==============================================
// 数组查找元素
// 查找目的：1.是否存在  2.找出我所需要的元素
// ES5
// 目的1：需要判断返回的数组长度（性能低，需要将数组内元素全部遍历。其实，只要存在就停止循环即可）；
// 目的2：可直接得到
// 返回满足你要求的所有值
let array4 = [1, 2, 3, 4, 5, 6];
// let temp = array4.filter(function (item) {
//   //   return item === 3;
//   return item % 2 === 0;
// });
// ES6
// 目的1：可以直接收到符合要求的第一个元素（不返回位置）（存在就返回，不会继续遍历）
// 目的2：只能返回第一个符合要求的元素
// 返回满足你要求的值
// let temp = array4.find(function (params) {
//   //   return params === 2;
//   return params % 2 === 0;
// });
// 返回位置（弥补find无法返回位置的缺点）
let temp = array4.findIndex(function (params) {
  //   return params === 2;
  return params % 2 === 0;
});

console.log(temp);

/**
 * 总结：
 * Array数组
 *  遍历、转换、生成、查找
 */

// 课后问答
// 1.js世界里有哪些元素是可遍历的？
// 数组、伪数组（nodeList、collection）、对象、
// 2.如何给数据结构自定义遍历
// 3.find()与ES5中filter()有什么区别
// find找到符合要求的元素直接返回，不会对接下来的元素进行遍历，只会返回数组元素，不会返回元素位置
// filter会将所有符合要求的元素放到新数组中返回，意味着会对数组内的元素全部遍历

// 课外延展
var obj = {},
  count = 0;
function logArray(value, index, array) {
  count++;
  obj[count] = value;
}
[1, 2, , 4].forEach(logArray);
// 结果obj为 {1: 1, 2: 2, 3: 4}
// 底层forEach实现会检验传入的数组没有元素的有效性，无效就不会走回调

/*
Array.from()
Array.isArray()
Array.of()
Array.prototype.concat()
Array.prototype.copyWithin()
Array.prototype.entries()
Array.prototype.every() 目的1
Array.prototype.fill()
Array.prototype.filter()
Array.prototype.find()
Array.prototype.findIndex()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.forEach()
Array.prototype.includes() 目的2
Array.prototype.indexOf() 目的2
Array.prototype.join()
Array.prototype.keys()
Array.prototype.lastIndexOf() 目的2 
Array.prototype.map()
Array.prototype.pop()
Array.prototype.push()
Array.prototype.reduce()
Array.prototype.reduceRight()
Array.prototype.reverse()
Array.prototype.shift()
Array.prototype.slice()
Array.prototype.some() 目的1
Array.prototype.sort()
Array.prototype.splice()
Array.prototype.toLocaleString()
Array.prototype.toSource()
Array.prototype.toString()
Array.prototype.unshift()
Array.prototype.values()
*/
