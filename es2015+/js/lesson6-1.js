// 0xD800-0xDFFF ES10前无法转义，导致页面出现乱码
// console.log(JSON.stringify('\u{D800}'))

// let arr = [1, [2, 3], [4, 5, [6, 7, [8, 9]]]];
// let arr = [1, 2, 3];
// // 扁平化输出，递归合并（可指定深度）
//  [4, 5, [6, 7, [8, 9]]] 需要三次
// console.log(arr.flat(2));
// console.log(arr.flat(4));
// // arr.flatMap()
// flatMap === map与flat合用，map后数组中元素都为数组，通过调用flat（默认深度为1），扁平化输出
// console.log(arr.map((item) => [item * 2]).flat());
// console.log(arr.flatMap((item) => [item * 2]));

// 去除空格
// let str = '   foo   ';
// console.log(str);
// console.log(str.replace(/^\s+|\s+$/g, ''));
// console.log(str.trimLeft()); // trimStart
// console.log(str.trimEnd()); // trimRight
// console.log(str.trim());

// 正则匹配指定字符串多个位置
// let str = `"foo" and "bar" and "baz"`;
// 一、exec方式，从字符串首部开始匹配，每次只匹配一个结果
// function select(regExp, str) {
//   const matches = [];
//   while (true) {
//     // 若正则没有使用g全局模式，每次匹配的结果都是第一个
//     const match = regExp.exec(str);
//     if (match === null) break;
//     matches.push(match[1]);
//   }
//   return matches;
// }
// console.log(select(/"([^"]*)"/g, str));
// console.log(str.match(/"([^"]*)"/));

// 二、replace方式，使用其高级语法传入函数
// function select(regExp, str) {
//   const matches = [];
//   str.replace(regExp, function (all, first) {
//     // all 完整匹配  first 分组捕获
//     matches.push(first);
//   });
//   return matches;
// }
// console.log(select(/"([^"]*)"/g, str));

// 三、matchAll：返回指定字符串中所有满足正则的字符串片段
// function select(regExp, str) {
//   const matches = [];
//   for (const match of str.matchAll(regExp)) {
//     matches.push(match[1]);
//   }
//   return matches;
// }
// console.log(select(/"([^"]*)"/g, str));

//
// Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
// const arr = [
//   ['foo', 1],
//   ['bar', 2],
// ];
// const obj = Object.fromEntries(arr);
// console.log(obj);
// console.log(obj.bar);
/* 最强应用一（Object转Array）：
    过滤对象中的属性长度为3的
    旧方式：for in/for of 遍历判断属性长度，再多创建一个对象存储满足条件的属性与值
    新方式：使用Object.entries将对象转化为数组，数组的api丰富，使用filter过滤方法，传入函数使用解构
            赋值，对数组进行过滤，最终使用Object.fromEntries将数组再转化对象
*/
// const obj = {
//   abc: 1,
//   def: 2,
//   ghksks: 3,
// };
// let res = Object.fromEntries(
//   Object.entries(obj).filter(([key, val]) => key.length === 3)
// );
// console.log(res);
/* 最强应用二：
    该方法的一个用处是配合URLSearchParams对象，将查询字符串(url的search部分)转为对象。
*/
// Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))

//
// try {
//   // console.log();
// } catch {
//   //catch后不强制必须加()
// }

//
// BigInt 现在允许处理大于2的53次方的数字
// console.log(11n);

/*
    自己如何给Array实现一个Flat函数（MDN）
*/
