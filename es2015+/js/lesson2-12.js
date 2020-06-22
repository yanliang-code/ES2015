// 1.租房情景：
// o：房主
let o = {
  name: 'xiaoming',
  price: 190,
};
// d：代理
let d = new Proxy(o, {
  get(target, key) {
    if (key === 'price') {
      return target[key] + 20;
    } else {
      return target[key];
    }
  },
});
// 代理对外宣称的信息
console.log(d.price, d.name);

// 2.校验表单数据是否规则：
// 规则：价格上限300；不允许随便增删属性
// 好处：业务代码中无需写检验数据的代码，使开发者专注业务
let f = {
  name: 'xiaoming',
  price: 190,
};

let validator = (target, key, value) => {
  if (Reflect.has(target, key)) {
    if (key === 'price') {
      if (value > 300) {
        return false;
      } else {
        target[key] = value;
      }
    }
  } else {
    return false;
  }
};

let proxyF = new Proxy(f, {
  get(target, key) {
    return target[key] || ''; // 防止取对象中没有的属性，返回undefiend
  },
  set: validator, // 动态改变validator变量的指向，实现不同规则的校验
});
// proxyF.price = 390; // 大于300，return false
// proxyF.price = 290;
proxyF.name = 'hanmeimei';
proxyF.age = 400; // 破坏结构，return false
console.log(proxyF.price, proxyF.name, proxyF.age); // 不存在的属性，返回空字符串

// 3.后端拿来的数据，需要拍寻。有个按钮，点击后可以还原顺序(只读)
let m = {
  name: 'xiaoming',
  price: 190,
};
// let n = new Proxy(m, {
//   get(target, key) {
//     return target[key];
//   },
//   // target：o对象；key：键；value：赋的值；
//   set(target, key, value) {
//     return false;
//   },
// });
// n.price = 300; // 保护m对象
// console.log(n.name, n.price);

// ES5实现保护对象
// 遍历m对象，并将m对象上的key设置为不可写状态
for (let [key] of Object.entries(m)) {
  Object.defineProperty(m, key, {
    writable: false, // 不可写
  });
}
m.price = 300;
console.log(m.name, m.price);

/*
    ES5：设置只读，导致用户与开发者都无法修改指定对象，除非使用Object.defineProperty将其属性描述进行修改
    ES6：用户无法修改指定对象，开发者修改指定对象的属性值
*/

// 4.监控用户的违规操作，上传到服务器，用于后期发现用户使用习惯
window.addEventListener(
  'error',
  (e) => {
    // report 上报逻辑
    console.log(e.message);
  },
  true
); //不走冒泡机制
let j = {
  name: 'xiaoming',
  price: 190,
};

let validator1 = (target, key, value) => {
  if (Reflect.has(target, key)) {
    if (key === 'price') {
      if (value > 300) {
        // 正常需要在此写监控上报的业务逻辑，导致多个validator多个相同的上报逻辑，修改删除都比较麻烦（高耦合）
        // 不满足规则就要触发错误，触发错误后，赋值失败（通过抛出错误，全局监听错误产生，进行上报逻辑，进行解耦）
        throw new TypeError('price exceed 300');
        // return false;
      } else {
        target[key] = value;
      }
    }
  } else {
    return false;
  }
};

let proxyJ = new Proxy(j, {
  get(target, key) {
    return target[key] || ''; // 防止取对象中没有的属性，返回undefiend
  },
  set: validator1, // 动态改变validator变量的指向，实现不同规则的校验
});
// proxyJ.price = 400; // 破坏结构，return false
console.log(proxyJ.price, proxyJ.name, proxyJ.age); // 不存在的属性，返回空字符串

// 生成只读的组件id，不许修改，违反唯一性
// 随机、唯一、只读
class Component {
  constructor() {
    // new Prxoy 入参必须是两个参数
    this.proxy = new Proxy(
      {
        id: Math.random().toString(36).slice(-8),
      },
      {}
    );
  }
  // 实例对象id属性的读操作
  get id() {
    return this.proxy.id;
  }
}
const com1 = new Component();
const com2 = new Component();
for (let i = 0; i < 10; i++) {
  console.log(com1.id, com2.id);
}
com1.id = 'qwe';
console.log(com1.id, com2.id);

// 撤销代理的操作
let p = {
  name: 'xiaoming',
  price: 190,
};
// 返回值与new Proxy不同。需要通过.proxy属性进行属性取值
let proxyP = Proxy.revocable(p, {
  get(target, key) {
    if (key === 'price') {
      return target[key] + 20;
    } else {
      return target[key];
    }
  },
});
// proxyP.proxy：代理信息  roxyP.revoke：撤销代理
console.log(proxyP.proxy, proxyP, proxyP.proxy.price);
setTimeout(() => {
  // 阅后即焚，哈哈哈
  proxyP.revoke(); // 撤销代理
  setTimeout(() => {
    console.log(proxyP.proxy.price); // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
  }, 100);
}, 1000);

/*
练习：
    1.组件初始化时赋值一个可读且随机的ID，该怎么做
    2.临时代理有哪些应用场景（读取后自动取消代理，之后无法读取）
    3.如何把接口的数据用代理进行包装
*/
