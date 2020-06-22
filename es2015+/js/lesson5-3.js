// const input = {
//   a: 1,
//   b: 2,
// };
// const test = {
//   d: 5,
// };

// const output = {
//   ...input, // spread（拷贝方式，不是引用方式）
//   ...test,
//   c: 3,
// };

// console.log(input, output);
// input.a = 4; // 修改input的属性，不会影响output中的属性
// //
// console.log(input, output);

const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
};

const { a, b, ...rest } = input; // rest（合并拆剩下的属性）

console.log(a, b, rest);
