let grade = {
  lilei: 96,
  hanmeimei: 99,
};
// ES5的方法，遍历对象，获取key
let result = [];
for (let k in grade) {
  if (k === 'lilei') {
    result.push(k);
  }
}

console.log(result);
// ES8通过ES8的Object.keys获取指定对象的所有key，返回字符串数组
console.log(Object.keys(grade).filter((item) => item === 'lilei'));
// ES8通过ES8的Object.values获取指定对象的所有value，返回字符串数组
console.log(Object.values(grade).filter((item) => item > 96));
// let result = []
// Object.entries让对象变成可遍历的数据结构
// for (let [k, v] of Object.entries(grade)) {
//   console.log(k, v);
// }

// console.log(result)
