// es5：需要先知道要调用的函数名，在通过call、apply指定this指向（也就是调用者）
// es6 reflect：现在可以先不指定调用的函数名，可先调用apply方法，在apply执行时再去确定要执行的函数

console.log(Math.floor(1.72));
// 明确函数名，指定作用域，传参
console.log(Math.floor.apply(null, [1.72])); // 全放在数组中传
console.log(Math.floor.call(null, 1.72)); // 单个传
// 此时的Math.floor是传入参数，只有在运行态下才能确定下来
console.log(Reflect.apply(Math.floor, null, [1.72]));

let price = 101.5;
// ES5
// if (price > 100) {
//   price = Math.floor.apply(null, [price]);
// } else {
//   price = Math.ceil.apply(null, [price]);
// }
// console.log(price);
// ES6(与ES5的区分在于是否能将函数作为变量传入)
let reflectPric = Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [
  price,
]);
console.log(reflectPric);

let d = new Date();
console.log(d.getTime());
// 其实就是做了new的动作，不过此方法支持类作为参数传入
let reflectD = Reflect.construct(Date, []);
// instanceof 判断对象是否为指定类的实例
console.log(reflectD.getTime(), reflectD instanceof Date);

const student = {};
// const r = Object.defineProperty(student, 'name', { value: 'Mike' });
// 使用Object与Reflect的区别，在于返回值不同（对象，布尔）
// 未来Object上的属性都会慢慢迁移到Reflect上
const r = Reflect.defineProperty(student, 'name', { value: 'Mike' });
console.log(student, r);

const obj = { x: 1, y: 2 };
// 与definProperty一致
// const reflectObj = Reflect.deleteProperty(obj, 'x');
// console.log(obj);

// 这个动态化传入目标参数意义不大，对象可以通过点，数组可以下标获取相应值
console.log(Reflect.get(obj, 'x'));
console.log(Reflect.get([2, 3], 1));

// 获取对象上指定属性的配置
console.log(Object.getOwnPropertyDescriptor(obj, 'x'));
console.log(Reflect.getOwnPropertyDescriptor(obj, 'x'));

// 获取指定对象上的原型链对象
console.log(Reflect.getPrototypeOf(d));

// 判断对象上是否存在指定属性（属性包含变量、函数）（Object上没有）
console.log(Reflect.has(obj, 'x'));
console.log(Reflect.has(obj, 'z'));

// Object.freeze(obj); // 冻结对象(不能属性操作)后，isExtensible返回就为false
// obj.z = 3;
// delete obj.x;
// 判断变量内容是否为可扩展的（是否冻结）
console.log(Reflect.isExtensible(obj));
console.log(obj);

// 原型链上的属性也算实例对象上的属性，判断是否为实例对象自身的属性
// 返回值为实例对象自身的属性
console.log(Reflect.ownKeys(obj));
console.log(Reflect.ownKeys([]));
console.log(Reflect.ownKeys([1, 2, 3]));
// Symbol 很少用，自查MDN

// preventExtensions等同于Object下的freeze方法，禁止扩展
// Reflect.preventExtensions(obj);
// console.log(Reflect.isExtensible(obj));

// 增加/修改属性对应的值
Reflect.set(obj, 'z', 4);
console.log(obj);
let arr = ['duck', 'duck', 'duck'];
Reflect.set(arr, 2, 'goose');
console.log(arr);
console.log(Reflect.getPrototypeOf(arr)); // Array
// 给指定实例对象设置原型对象
Reflect.setPrototypeOf(arr, String.prototype);
console.log(Reflect.getPrototypeOf(arr)); // String
// arr.sort(); //arr的数组原型对象已经改为字符串原型对象

/*
理解什么是反射机制
什么场景下使用这个机制，更加的简单灵活，动态化

*/
