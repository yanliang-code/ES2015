const data = {
  PortLand: '78/50',
  Dublin: '88/52',
  Lima: '58/40',
};
/*
    学生因为犯错误，被学校开除；但是他的档案还会存在学校，可是在遍历数据
    展示所有学生时，不可以展示他。可通过数据库标识区别，也可以前台设置对象
    描述符，让其无法遍历出
*/
Object.defineProperty(data, 'Lima', {
  enumerable: false, // 不可遍历、枚举
  writable: false,
});

console.log(Object.keys(data));
// 获取对象所有属性的描述符
console.log(Object.getOwnPropertyDescriptors(data));
// 获取对象指定属性的描述符
console.log(Object.getOwnPropertyDescriptor(data, 'Lima'));

data.Lima = '59/50';
