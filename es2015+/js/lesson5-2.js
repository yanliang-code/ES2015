const Gen = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (time < 500) {
        reject(time);
      } else {
        resolve(time);
      }
    }, time);
  });
};
// 新增finally属性，没有此属性，需要在then、catch中各做一部分逻辑
// 存在此属性，最后兜底会执行此回调
Gen(Math.random() * 1000)
  .then((val) => console.log('resolve', val))
  .catch((err) => console.log('reject', err))
  .finally(() => {
    console.log('finish');
  });
