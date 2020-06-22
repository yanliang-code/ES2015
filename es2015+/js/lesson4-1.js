// async作用：不需要手动在函数内new Promise对象，内部会自动的将返回值包装成Promise对象
// async function firstAsync() {
//   return 27;
//   // return Promise.resolve(28);
// }

// 函数前加上async，返回值状态为resolved的promise对象；不加，返回27
// console.log(firstAsync());
// firstAsync().then((val) => {
//   console.log(val);
// });
// // 判断实例是否通过Promise构造函数new产生
// console.log(firstAsync() instanceof Promise);

// new Promise内部就是一个异步操作，异步操作有结果后，使用resolve, reject对外进行告知
// 加上async的函数内部也是一个异步操作

// 加async的函数本身就是异步操作
async function firstAsync() {
  // 手动声明一个异步操作
  let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('now it is done');
    }, 1000);
  });
  // 获取手动声明的异步操作结果
  //   promise.then((val) => {
  //     console.log(val);
  //   });
  // 目前执行结果是 2、 3、 now it is done
  // 加上await字段后，promise的异步操作改为同步操作
  // 正常promise会返回Promise对象，await promise，相当于取Promise对象中的值
  let result = await promise;
  console.log(result);
  console.log(await 30); // await后必须跟着Promise对象，若不是，会自动包装成Promise对象
  console.log(await Promise.resolve(40));
  console.log(2);
  return Promise.resolve(3);
}

// firstAsync().then((val) => {
//   console.log(val);
// });

async function a() {
  try {
    // await后必须跟Promise对象，若执行其他函数，还是要陷式的返回new Promise
    let bResult = await b();
    console.log('bResult==', bResult);
    console.log('a函数打印。。。。。。');
  } catch (error) {
    // 异步函数reject只能在catch中发现
    console.log('error===', error);
  }
}

function b() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve('b执行完成');
      reject('b执行失败');
    }, 5000);
  });
}

a();
