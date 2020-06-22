// ES5 无法在遍历过程中暂停
function loop() {
  for (let i = 0; i < 5; i++) {
    console.log(i);
  }
}
loop();

// 声明函数时，必须有星号（generator函数）
function* newLoop() {
  for (let i = 0; i < 5; i++) {
    // 通过使用yield暂停遍历，下面通过next开启代码执行
    yield console.log(i);
  }
}
const l = newLoop(); // 返回对象
// 每调用一个next，就会执行一次遍历；超过遍历范围后，不再执行
l.next();
l.next();
l.next();
l.next();

console.log('========================');
function* gen() {
  let val;
  val = yield 1;
  console.log(val);
}
const g = gen();
// next()：寻找的时yield关键字或者函数结尾
// 第一个next函数：开始执行gen函数，执行到yield语句停止,但会解析yeild后的表达式
// 第二个next函数：开始从yield语句开始执行，但是yield的返回值为undefiend，所以val值为undefiend
g.next();
g.next();

console.log('========================');
function* gen1() {
  let val;
  val = yield [1, 2, 3];
  console.log(val);
}
const g1 = gen1();
// 当前遍历的数据是什么？当前的遍历是否结束？
// 执行顺序同上
console.log(g1.next()); // {value: Array(3), done: false}  value:yield后的变量  done:是否为函数的结束
console.log(g1.next()); // {value: undefined, done: true}  函数结束 value一定为undefiend ，done为true

console.log('========================');
function* gen2() {
  let val;
  // * 后，可以为可遍历的对象以及generator对象
  val = yield* [1, 2, 3];
  console.log(val);
}
const g2 = gen2();
// 一直卡在yield处，挨个返回值
console.log(g2.next()); // {value: 1, done: false}
console.log(g2.next()); // {value: 2, done: false}

/*
1.generator干什么用的
2.yield是否有返回值
3.相比ES5,如何控制程序的暂停与启动的
*/

// generator可以控制函数的执行与暂停，是否还能在再次执行时，传入参数
function* gen3() {
  let val;
  val = yield [1, 2, 3];
  console.log(val);
}
const g3 = gen3();
console.log(g3.next(10));

console.log(g3.return()); // {value: undefined, done: true} 提前中止函数执行
// console.log(g3.return(100)); // {value: 100, done: true} 提前中止函数执行

console.log(g3.next(20)); //调用执行时，若触发了 yield，yield的返回值有调用next时的入参决定

console.log('========================================================');
// 使用es6 generator写死循环（若使用es5写法，浏览器很快就会崩掉）
// generator函数由于是外部控制指定函数执行，不会出现此情况
function* gen4() {
  while (true) {
    try {
      yield 1;
    } catch (error) {
      console.log(error.message);
    }
  }
}
const g4 = gen4();
console.log(g4.next());
console.log(g4.next());
console.log(g4.next());
// 显示捕获了异常，但是不影响继续向下执行代码
g4.throw(new Error('ss')); // 此作用类似普通for循环中continue的作用
console.log(g4.next());

/*
generator高级语法
1.next函数可以传入参数，用于修改函数内部运行的数据
2.可提前终止函数的运行，使用return函数
3.可外部对内部抛出异常，内部捕获到异常并进行处理，程序以后的运行不会被干扰
*/

// 场景一：抽奖
function draw(first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E'];
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2H', '2I', '2J'];
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3H', '3I', '3J'];
  let result = []; // 获奖者
  let random;
  for (let i = 0; i < first; i++) {
    random = Math.floor(Math.random() * firstPrize.length);
    result = result.concat(firstPrize.splice(random, 1));
  }
  for (let i = 0; i < second; i++) {
    random = Math.floor(Math.random() * secondPrize.length);
    result = result.concat(secondPrize.splice(random, 1));
  }
  for (let i = 0; i < third; i++) {
    random = Math.floor(Math.random() * thirdPrize.length);
    result = result.concat(thirdPrize.splice(random, 1));
  }
  console.log('result===', result);
}
draw();
// 每次产生一个获奖名额（generator函数）
function* draw1(first = 1, second = 3, third = 5) {
  let firstPrize = ['1A', '1B', '1C', '1D', '1E'];
  let secondPrize = ['2A', '2B', '2C', '2D', '2E', '2F', '2H', '2I', '2J'];
  let thirdPrize = ['3A', '3B', '3C', '3D', '3E', '3F', '3H', '3I', '3J'];
  let count = 0; // 计数器，用于判断当前第几个
  let random;
  while (1) {
    if (count < first) {
      random = Math.floor(Math.random() * firstPrize.length);
      yield firstPrize[random];
      count++;
      firstPrize.splice(random, 1);
    } else if (count < first + second) {
      random = Math.floor(Math.random() * secondPrize.length);
      yield secondPrize[random];
      count++;
      secondPrize.splice(random, 1);
    } else if (count < first + second + third) {
      random = Math.floor(Math.random() * thirdPrize.length);
      yield thirdPrize[random];
      count++;
      thirdPrize.splice(random, 1);
    } else {
      return false;
    }
  }
}
console.log('===============================================');
const d = draw1();
console.log(d.next().value);
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());
console.log(d.next());

// 场景二：逢3过
function* count(x = 1) {
  while (1) {
    if (x % 3 === 0) {
      yield x;
    }
    x++;
  }
}
const c = count();
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);
console.log(c.next().value);

/*
斐波那契数列

练习：
1.使用Generator实现一个斐波那契数列
2.使用Generator给自定义数据结构写一个遍历器
*/

/*
用Generator实现一个斐波那契数列
斐波那契数列的特点：
1.0、1、1、2、3、5、8、13、21、44、65
2.前两个数字之和就是后面的那个数字
*/
// 递归实现
function fibo1(m) {
  if (m < 2) {
    return m;
  }
  return fibo1(m - 1) + fibo1(m - 2);
}
// 优化：使用缓存，利用空间换时间
function fibo2(m) {
  let cache = [0, 1];
  if (typeof cache[m] == 'number') {
    return cache[m];
  }
  cache[m] = fibo2(m - 1) + fibo2(m - 2);
  return cache[m];
}
// 动态规划实现
// 递归：由上到下 动态规划：由下到上的
function fibo3(m) {
  let dp = [0, 1];
  for (let i = 2; i <= m; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[m];
}

function* fibo4() {
  let ge = [0, 1];
  let count = 0;
  while (1) {
    if (typeof ge[count] === 'number') {
      yield ge[count];
    } else {
      let newVal = ge[count - 2] + ge[count - 1];
      ge[ge.length] = newVal;
      yield newVal;
    }
    count++;
  }
}

console.log('=============================================');

for (let index = 0; index < 10; index++) {
  console.log(fibo1(index));
}
console.log('=============================================');

for (let index = 0; index < 10; index++) {
  console.log(fibo2(index));
}
console.log('=============================================');

for (let index = 0; index < 10; index++) {
  console.log(fibo3(index));
}
console.log('=============================================');

const f = fibo4();
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);
console.log(f.next().value);

console.log('============================');

// generator实现 遍历
function* gene() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}
console.log(gene());

// for (let n of gene()) {
//   if (n > 1000) {
//     break;
//   }
//   console.log(n);
// }
