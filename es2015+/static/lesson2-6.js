// Object
let x = 1,
  y = 2,
  z = 3;
// ES5
let obj1 = {
  x: x,
  y: y,
  hello: function () {
    console.log('hello');
  },
};
obj1[z] = 5;
console.log(obj1);
/* ES6 
1.变量简写形式
2.属性值支持变量、表达式
3.函数支持简写形式
4.支持异步函数（加*号）
*/
let obj2 = {
  x,
  y,
  [z]: 5,
  [z + y]: 5,
  hello() {
    console.log('hello2');
  },
  *syncHello() {
    console.log('sync hello2');
  },
};
console.log(obj2);
obj2.hello();
console.log(obj2.syncHello()); // 比较特殊，以后会详述

// Set
// set的入参为：可遍历的对象
// 特点：set内的数据都是唯一的，若add的已存在的数据，自动过滤掉；遍历出数据的顺序是由添加的顺序决定
let s1 = new Set();
let s2 = new Set([1, 2, 3, 4]);
s1.add('hello'); // 增
s1.add('goodbye').add('hahah').add('goodbye');
// s1.delete('hello'); // 删
// s1.clear();
console.log(s1.has('hello')); // 查
console.log(s1.size); // 数据个数
console.log(s1); // 数据个数

// 遍历：set的key、value返回值一致，与Object中简写变量行为一致
console.log(s1.keys());
console.log(s1.values());
console.log(s1.entries()); // 所有的key-value值（后面详述）
s1.forEach((item) => {
  console.log(item);
});
for (let item of s1) {
  console.log(item);
}
// 改：没有直接API，建议先删再添加

// =============================================================
console.log('================================================');

// Map
// map的入参为：可遍历的对象(对象内部也要是[key,value]这种格式)
// 特点：map中的key可以是任意类型；遍历出数据的顺序是由添加的顺序决定
let map = new Map([[1, 2]]);
let map1 = new Map();
map1.set(1, 2); // 增
map1.set(3, 4);
map1.set(1, 'value=2'); // 改
// map1.delete(1); // 删：map删除使用索引，set删除使用存储的数据本身
// map1.clear(); // 清空
console.log(map1);
console.log(map1.size);
console.log(map1.has(1)); // 查：map、set区别同删除
console.log(map1.get(1)); // 查
// 遍历
console.log(map1.keys(), map1.values(), map1.entries());
map1.forEach((value, key) => {
  console.log(key, '===', value);
});
for (let [key, value] of map1) {
  // map初始化入参的格式为[[1, 2]]，发现遍历map时[key, value]写法的意义了吗？？
  console.log(key, '=--=', value);
}

// ===================================================
console.log('======================================');
// 对象拷贝
// const target = {};
// const source = { b: 4, c: 5 };
// 复杂对象下，结构相同，值不同，可以正常赋值到目标对象上
// 若目标对象比源对象多一个属性就会出问题,多的属性就会消失（原因：浅拷贝，对于引用类型只会简单的改变指向）
const target = { a: { b: { c: { d: 9 } }, e: 5, f: 6, h: 10 } };
const source = { a: { b: { c: { d: 1 } }, e: 2, f: 3 } };
// ES5：遍历source对象，将其属性拷贝到target对象上
// ES6
Object.assign(target, source);
console.log(target, 'target');
console.log(source, 'source');
// 目标对象传入的是undefiend和null会怎样 -> Uncaught TypeError: Cannot convert undefined or null to object
// 源对象传入undefiend和null会怎样 -> 目标对象无影响，保持原来的值
// 目标对象是个嵌套对象，子对象的属性会被覆盖嘛 -> 被覆盖，因为Object.assgin是浅拷贝

/*
Object：ES6多支持：变量、函数的简写形式  属性key值支持变量、表达式  支持异步函数
Set：与Object简写相似，key、value都一致，支持增查改以及遍历，删除比较麻烦，需要先删除再添加
Map：map中的key可以是任意类型；遍历出数据的顺序是由添加的顺序决定
Object.assign：对象拷贝

注意： WeakSet、WeakMap 不常用，没有讲
1.WeakSet与Set的区别：存储数据只能是对象
2.WeakMap与Map的区别：只允许接受对象类型的key值

课内引申：
SetIterator、MapIterator都是属于iterator，是可遍历对象
数组的解构赋值是按0、1、2位置的决定的，对象是按key值来决定的
*/
