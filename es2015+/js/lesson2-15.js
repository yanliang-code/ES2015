/* 
ES6如何把代码进行模块化设计?
1.ES6之前必须借助第三方框架，例如：require.js、sea.js
2.ES6现在已经支持模块导入导出功能

lesson2-15-mod 导出模块
lesson2-15 导入模块
*/

// 若导出模块使用大量export导出，可通过*来全部导入
// 此时通过export default导出，会默认挂载到Mod的default属性上
// import * as Mod from './lesson2-14-mod';
// import { name, addr, list } from './lesson2-14-mod';
// import name, { addr, list } from './lesson2-14-mod';
// import name2, { addr as addr2 } from './lesson2-14-mod';
// import name22 from './lesson2-14-mod';

import { run } from './lesson2-15-mod';

run();
// console.log(Mod, Mod.addr, Mod.default);
// console.log(name22);
// console.log(name2, addr2);
// console.log(name, addr, list);

// import * as Mod from './lesson2-14-mod'

// let test = new Mod.Test()
// console.log(test.id)
// let animal = new Mod.Animal()
// console.log(animal.name)
// let people = new Mod.default()
// console.log(people.id)
