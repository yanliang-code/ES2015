function loadScript(src) {
  let srcipt = document.createElement('script');
  srcipt.src = src;
  document.body.append(srcipt);
}
function test() {
  console.log('test');
}
// js是单线程的，执行到loadScript这里，发现由异步操作，会将其放到异步队列中，不再管它；
// 继续执行主线程，也就是执行test方法(同步操作)；主线程执行完毕，去异步队列取执行完成的
// loadScript('./1.js');
// test();

// 先执行1.js的内容，执行test函数
// ES5 -> 回调
function loadScriptEs5(src, callback) {
  let srcipt = document.createElement('script');
  srcipt.src = src;
  srcipt.onload = () => {
    callback(src);
  };
  srcipt.onerror = (error) => {
    callback(error);
  };
  document.body.append(srcipt);
}
function test(src) {
  console.log(src);
}

/*

// 回调的你头皮发麻，现在业务逻辑几乎没有（一个函数不能超过200行，不成文的规定）
loadScriptEs5('./1.js', function (src) {
  // 若需要在加载失败进行其他处理
  if (src.message) {
    // 失败,上报日志；还要继续加载其他资源，有可能1文件加载失败，就步加载2文件等等业务
    // 一顿if/else，并且还要loadScriptEs5,内部还有失败、成功两种情况，又要处理，带劲不
  } else {
    console.log(src); // 业务逻辑处理
    loadScriptEs5('./2.js', function (src) {
      console.log(src); // 业务逻辑处理
      loadScriptEs5('./3.js', function (src) {
        console.log(src); // 业务逻辑处理
      });
    });
  }
});

*/

// =====================================================

// ES6
function loadScriptEs6(src) {
  // 使用Promise，函数必须返回一个Promise对象
  // new Promise时，像是请求了个接口，状态pending，
  // resolve、reject都是返回结果(只能执行一个)，但是改变的状态值不同
  return new Promise((resolve, reject) => {
    // pending,undefined(状态，返回值)
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(src); // fulfilled,result
    script.onerror = (error) => reject(error); // rejected,error
    document.body.append(script);
  });
}
// 同步的方式写异步回调
// loadScriptEs6('./1.js')
//   .then(loadScriptEs6('./2.js'))
//   .then(loadScriptEs6('./3.js'));

/*
需要弄清三点：
    Promise对象调用then执行的是什么
    Promise状态是如何被改变的
    Promise返回值随着状态改变时，是如何传递数据的
*/
// =====================================================
// Promise对象原型上自带then函数，返回值为Promise对象；
// then内部入参有两个，一个是成功回调(resolve)，一个是失败回调(reject)
// 那为啥上面我们没定义两个函数入参，默认then会放回空的Promise对象，这样能保证可连续进行链式调用
// 上面代码可执行是因为浏览器会解析then函数内的入参，也就是执行了内部的函数loadScriptEs6('./2.js')
// 按下方标准写
// Promise.then(onFulfilled, onRejected);
loadScriptEs6('./1.js')
  .then(
    () => {
      // 这里失败了，正常3.js就不会进行加载；但是还是进行加载了
      // 说明调用第二个then的Promise对象不对，不是加载4.js返回的Promise对象
      // 想让第二个调用then的Promise被第一个调用then的影响，一定要用使用成功回调返回的Promise对象，不返回就默认空的Promise对象
      return loadScriptEs6('./4.js');
    },
    (error) => {
      console.log(error);
    }
  )
  .then(
    () => {
      loadScriptEs6('./3.js');
    },
    (error) => {
      console.log(error);
    }
  );
