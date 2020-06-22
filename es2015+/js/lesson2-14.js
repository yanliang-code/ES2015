let authors = {
  allAuthors: {
    fiction: ['Agla', 'Skks', 'LP'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    fantasy: ['J.R.Tole', 'J.M.R', 'Terry P.K'],
  },
  Addres: [],
};
// 遍历除各种领域中的作者
// ES6
// 1.需要将指定对象的属性变成可遍历的数据结构（指定对象，不易维护）
// 2.需要将数据组装到数组中（步骤复杂）
let r = [];
for (const [k, v] of Object.entries(authors.allAuthors)) {
  //   console.log(k, '|||', v);
  r = r.concat(v);
}
console.log('r===', r);

// 自定义迭代器（部署接口）
// 输入：this->对象本身  输出：返回值
authors[Symbol.iterator] = function () {
  /*
    返回值需要满足
        1.迭代器协议：针对返回对象内容的要求（详述如下） 注：generator函数根据此协议实现
        2.可迭代器协议：指定对象上存在以Symbol.iterator为key，对应value为函数

    返回值需要固定格式，对象，对象内必须由next函数，函数内返回一个对象，对象中必须由done和value属性
    done：告知当前遍历是否结束；value：当前遍历的对应值
  */
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors); // 指定对象可遍历的属性
  let values = []; // 维护数据
  return {
    next() {
      // 每次将一个可遍历属性对应的值（数组）遍历完，才会再次进行，获取对象的下一个属性
      if (!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]];
          keys.shift();
        }
      }
      return {
        done: !values.length,
        value: values.shift(),
      };
    },
  };
};

let r1 = [];
// for of 遍历复杂结构，可通过在对象的symbol.iterator属性赋值函数，默认会使用此函数进行处理，此处的v就是返回对象的value
for (const v of authors) {
  r1.push(v);
}
console.log('r1===', r1);
// const t = authors[Symbol.iterator]();
// console.log(t.next());
// console.log(t.next());
// console.log(t.next());
// console.log(t.next());

/*
    1.控制输入输出
    2.根据数据的结构来决定Iterator对应的函数内逻辑
使用
    1.只需要使用for of 进行遍历
    2.不需要考虑你获取的数据在指定数据中的位置
*/

let authors2 = {
  allAuthors: {
    fiction: ['Agla', 'Skks', 'LP'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    fantasy: ['J.R.Tole', 'J.M.R', 'Terry P.K'],
  },
  Addres: [],
};
// 使用generator实现自定义迭代器
// 使用无限循环，不用人为控制暂停以及返回值的格式，因为yield就有控制行为
authors2[Symbol.iterator] = function* () {
  let allAuthors = this.allAuthors;
  let keys = Reflect.ownKeys(allAuthors);
  let values = [];
  while (1) {
    if (!values.length) {
      if (keys.length) {
        values = allAuthors[keys[0]];
        keys.shift();
        yield values.shift();
      } else {
        return false;
      }
    } else {
      yield values.shift();
    }
  }
};
let r2 = [];
// for of 遍历复杂结构，可通过在对象的symbol.iterator属性赋值函数，默认会使用此函数进行处理，此处的v就是返回对象的value
for (const v of authors2) {
  r2.push(v);
}
console.log('r2===', r2);

/*
课外读物
    1.ES6迭代器
练习：
    1.什么时自定义遍历，如果有复杂的数据结构会使用自定义遍历了吗
    2.什么是迭代协议、可迭代协议？
    3.Generator和Iterator的关联关系理解了吗
        generator是生成器，当然是用来生成某些东西。「generator」生成「Iterator对象」
*/
