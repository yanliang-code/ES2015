// y修饰符
const s = 'aaa_aa_a';
const r1 = /a+/g;
const r2 = /a+/y; // ^ $

// ["aaa", index: 0, input: "aaa_aa_a", groups: undefined]
// [匹配的值，起始位置，输入的字符串，以后详述]
console.log(r1.exec(s)); // exec 匹配
console.log(r2.exec(s));

console.log(r1.exec(s)); // ["aa", index: 4, input: "aaa_aa_a", groups: undefined]
// g：global 第一次匹配aaa，下次匹配因为是全局匹配g，所以起始位置不重要，第二次匹配上aa
console.log(r2.exec(s)); // null
// y：sticky 第一次匹配aaa，下次匹配的起始位置从_开始，发现无匹配，返回null

// ==============================================
console.log('=========================================');

// unicode 中英文以及其他语言的编码  -> u修饰符 \uffff 比如：20BB7超过4个字节
