function Gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

// function test() {
//   let arr = [Gen(2000), Gen(100), Gen(3000)];
//   // 延迟的异步操作不会阻止for of的循环
//   for (let item of arr) {
//     console.log(Date.now(), item.then(console.log));
//   }
// }
// test();

// async function test() {
//   let arr = [Gen(2000), Gen(100), Gen(3000)];
//   // 延时的异步操作阻止for of的循环，不过await无法获取值
//   for (let item of arr) {
//     console.log(Date.now(), await item.then(console.log));
//   }
// }

// test();
// async function test() {
//   let arr = [Gen(2000), Gen(100), Gen(3000)];
//   // for of 内先执行log，item由于时异步操作，会一直等待返回值后，进行log打印
//   for await (let item of arr) {
//     console.log(Date.now(), item);
//   }
// }

// test();
/*总结：
    for of是遍历同步操作的，若循环的变量中存在异步操作，让其异步操作变成同步操作需要使用
    async、for await of
*/

const obj = {
  count: 0,
  Gen(time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({ done: false, value: time });
      }, time);
    });
  },
  [Symbol.asyncIterator]() {
    let self = this;
    return {
      next() {
        self.count++;
        if (self.count < 4) {
          return self.Gen(Math.random() * 1000);
        } else {
          return Promise.resolve({
            done: true,
            value: '',
          });
        }
      },
    };
  },
};

async function test() {
  for await (let item of obj) {
    console.log(Date.now(), item);
  }
}

test();
/*
    1.for await of 解决的问题？ 遍历的数据结构中存在异步操作（将异步改为同步执行）
    2.for await of 与 for of 的区别是什么
    3.自定义异步结构如何遍历
*/
