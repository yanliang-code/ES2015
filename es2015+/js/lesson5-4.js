// .大部分可以代替任意字符（除四个字节的u7f16字符、行终止符/n /r）
// console.log(/foo.bar/.test('fooabar'));
// console.log(/foo.bar/.test('foo\nbar'));
// console.log(/foo.bar/s.test('foo\nbar')); // 开启dotAll模式，行终止符/n /r也可使用.代替（ES9新增）
// console.log(/foo.bar/su.test('foo\nbar')); // 开启u模式，四个字节的u7f16字符也可使用.代替

// const re = /foo.bar/gisu;
// console.log(re.dotAll); // 判断是否启动dotAll模式方法之一
// console.log(re.flags); // 判断是否启动dotAll模式方法之二

// const t = '2019-06-07'.match(/(\d{4})-(\d{2})-(\d{2})/);
// console.log(t); // ["2019-06-07", "2019", "06", "07", index: 0, input: "2019-06-07", groups: undefined]
/*
ES5 
1.完整的匹配：正则在字符串中匹配的结果
2.第一个分组{}匹配的结果
3.第二个分组{}匹配的结果
4.第三个分组{}匹配的结果
5.index：正则从第几个字符开始匹配的
6.input：输入的字符串
6.groups：分组 undefined
*/
// console.log(t[1]);
// console.log(t[2]);
// console.log(t[3]);t

// ES9支持给分组命名（此时groups字段为对象，key为分组命名，value为匹配的值）
// const t = '2019-06-07'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
// console.log(t);
// console.log(t.groups.year);
// console.log(t.groups.month);
// console.log(t.groups.day);

// 断言
// let test = 'hello world';
// console.log(test.match(/hello(?=\sworld)/)); // 先行断言，判断前面hello时，立刻判断hello后面是否满足指定正则（js默认使用的）
// console.log(test.match(/(?<=helle\s)world/)); // 后行断言，先匹配到world，此时立刻判断world前面是否满足指定正则（ES9新增）
// /(?<!helle\s)world/ -->  ?<!后行断言不等于   ?<=后行断言等于

/*练习题：
1.把'$foo %foo foo'字符串中前面是$符号的foo替换成bar
2.提取'$1 is worth about ￥123'字符串中的美元数是多少
*/

const test = '$foo %foo foo';
// 替换谁，谁是目标，$只是定位目标的一点而已
console.log(test.replace(/(?<=\$)foo/, 'bar'));
const test1 = '$1 is worth about ￥123';
const t1 = test1.match(/(?<=\￥)(?<money>\d+)/);
console.log(t1.groups.money); // 命名需要放入分组的花括号中
