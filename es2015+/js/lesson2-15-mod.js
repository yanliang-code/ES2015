// 单个导出，引入时需要单个解构(使用花括号)
// export const name = 'hello';
// export let addr = 'Beijing';
// export var list = [1, 2, 3];
// let haha = 'haha';
// export default haha;

// const name = 'hello4';
// let addr = 'Beijing';
// let list = [1, 2, 4];
// 设置默认导出模块，此时直接导入，不需要使用花括号解构
// 默认导出模块只支持一个，导入时，支持与导出模块命名不一致
// export default name;
// 多个变量同时导出，引入时需要单个解构(使用花括号)
// 支持导出多个，导入时，必须知道导出模块命名，列别名需要使用as关键字
// export { addr, list };

// const say = (content) => {
//   console.log(content)
// }
// const run = () => {
//   console.log('i am running')
// }
// export default say
// export {
//   run
// }

export function say() {
  console.log('say');
}
// 对外导出的模块，本模块也是可用的
export function run() {
  say();
}

// const data = {
//   code: 1,
//   message: 'success',
// };
// const des = {
//   age: 20,
//   addr: 'Beijing',
// };
// // 默认导出对象，对象内有其他变量
// export default {
//   data,
//   des,
// };

// export class Test {
//   constructor() {
//     this.id = 6;
//   }
// }

// export class Animal {
//   constructor() {
//     this.name = 'dog';
//   }
// }

// export default class People {
//   constructor() {
//     this.id = '132';
//   }
// }
