// ES5
/*
    Animal看作构造函数，把每个对象独一份的相关变量以及函数放在其中
    Animal.prototype看作父类，将所有公用的变量以及函数放在其中
*/
// 类声明
// 构造函数：1.传入参数 2.初始化
let Animal = function (type) {
  this.type = type; // this指向实例对象
  //   this.eat = function () {
  //     console.log('eat food');
  //   };
};
Animal.prototype.eat = function () {
  Animal.walk();
  console.log('eat food 1');
};
Animal.prototype.name = 'life';
// 静态方法(实例对象无法调用，可直接通过类名.函数()执行)
Animal.walk = function () {
  console.log('walk');
};
// 生成类的实例
let dog = new Animal('dog');
let monkey = new Animal('monkey');

console.log(dog.eat());
console.log(monkey);

// 修改实例对象自身的方法（只能修改本身的方法，因为此写法每个实例化对象都自己维护一个eat方法）
// monkey.eat = function () {
//   console.log('error');
// };
//
// 修改实例对象的原型链上的方法（一个地方，所有实例对象都变化-->继承的本质）
monkey.constructor.prototype.eat = function () {
  console.log('error');
};

dog.eat(); // eat food
monkey.eat(); // error
/*
缺点：
1.应该是eat方法是所有动物的通用方法，修改一个，全部修改（但现在是每个实例独有的）
2.不提出公用方法，每个实例下拥有太多方法，过重
修改方法：
1.将通用方法放到原型链prototype上,实现继承效果
*/

// ES5 继承
// dog 继承 Animal
let Dog = function () {
  // 初始化父类的构造函数（初始化时，this指向dog实例对象，这样就将父类的一部分属性、函数挂载到dog实例对象上）
  // 继承Animal构造函数上的属性、函数
  Animal.call(this, 'dog');
  this.run = function () {
    console.log('run');
  };
};
// 将dog的原型链指向与Animal指向保持一致（继承Animal的实例对象上的属性、函数） -> 引用类型、值类型
Dog.prototype = Animal.prototype;

let sonDog = new Dog('dog');
console.log(sonDog);

// ====================================================================
console.log('=========================================');

// ES6(是ES5使用prototype生成类的语法糖，效果一样)

// class Animal1 {
//   //
//   constructor(type) {
//     this.type = type;
//     this.haha = function () {};
//   }
//   eat() {
//     console.log('eat food');
//   }
// }
// let dog1 = new Animal1('dog');
// let monkey1 = new Animal1('monkey');
// console.log(dog1);
// console.log(monkey1);

// console.log(typeof Animal1);

// =================================================

// ES6属性的保护与只读

let _age = 4; // 私有属性constructor中不支持，需要结合闭包使用
class Animal1 {
  //
  constructor(type) {
    this.type = type;
  }
  // 允许不在constructor上定义属性，但是必须加上get/set
  // get set 只是出入口，不是对指定属性的读写操作
  //   get age() {
  //     return 4;
  //   }
  //   set age(val) {
  //     this.realAge = val;
  //   }

  // 有set、get后，可以在读写变量值前可以做逻辑
  get age() {
    return _age;
  }
  set age(val) {
    // 这里函数名与函数体内被赋值的变量名不能一致，否则会产生死循环
    if (val < 7 && val > 4) {
      _age = val;
    }
  }
  eat() {
    console.log('eat food');
  }
}
let dog1 = new Animal1('dog');
// let monkey1 = new Animal1('monkey');
console.log(dog1.age); // 4   4
dog1.age = 5;
console.log(dog1.age); // 4   5
console.log(dog1.realAge); // 5
// console.log(monkey1);

// console.log(typeof Animal1);

/*
    总结：
        1.ES5无法在变量值读写时进行拦截，ES6可以通过set、get(属性)
        2.ES6在使用set、get时函数名与函数体内变量名不能一致；
        3.ES6私有变量只能结合闭包来让其生效

*/

// =============================================================================

console.log('*******************************************');
// https://juejin.im/post/5e147565e51d45416308ba93
class Animal2 {
  static TYPE_ADMIN = 'admin'; // 公有静态字段
  static #TYPE_USER = 'user'; // 私有静态字段
  // 静态方法：1.静态方法可以访问静态字段 2.静态方法不能访问实例字段
  // 不属于对象实例，是属于类的
  static getTypeName(name) {
    return User.#TYPE_USER;
  }
  type = 'unkown'; //公有实例字段
  #_age2 = 4; //私有实例字段
  constructor(type) {
    this.type = type;
  }
  getAge() {
    return this.#_age2;
  }
  // getter 和 setter 模拟常规字段，但对如何访问和更改字段有更多的控制。
  get age() {
    return this.#_age2;
  }
  set age(val) {
    if (val < 7 && val > 4) {
      this.#_age2 = val;
    }
  }
  // 实例方法可以访问和修改实例数据。实例方法可以调用其他实例方法，也可以调用任意静态方法。
  // 实例方法内的this指向类的实例
  eat() {
    console.log('eat food');
  }
  // 由于是私有的，#getType()不能在User类外部被调用。
  //   #getType() {
  // console.log('私有方法');
  //   }
}

let dog2 = new Animal2('dog');
console.log(dog2);
console.log(dog2.type);
console.log(dog2.getAge());
console.log(Animal2.TYPE_ADMIN);
// console.log(dog2.#_age2); // Uncaught SyntaxError: Private field '#_age2' must be declared in an enclosing class

/*
class的组成部分：
构造器
字段：公用字段、公有静态字段、私有字段、私有静态字段
方法：实例方法、静态方法、私有实例方法、私有静态方法、getter、setter方法
继承：语句 class Child extends Parent { } 中， Child类继承Parent 类的构造函数、字段和方法（会默认走父类构造器）
注意，父类的私有成员不能被子类继承
父类构造函数：constructor() 中的 super()  如果你想在子类中调用父类的构造函数，你需要在子类构造函数中使用特殊的super()方法。
如果你想在子类方法中访问父类方法，你可以使用特殊的快捷方式super() -> 代表父类实例
user是 User类的一个实例，因此user instanceof User的值为true；空对象{}不是 User的实例，相应的obj instanceof User就是false。
instanceof 是多态的：该操作符认为子类实例也是父类的实例。
*/

/*
    总结：
        1.方法依赖于某些方法或者属性（实例对象的一些信息），就要使用实例方法
        2.方法内不会使用到实例对象的方法与属性，就要使用静态方法
        3.ES6私有变量只能结合闭包来让其生效

*/

// ======================================================================

// ES6 继承
class User {
  name;

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class ContentWriter extends User {
  constructor(name) {
    // 若要写子类独有的属性或函数，需要显式的执行super函数；若不需要，constructor可不写，隐式执行
    // super必须在this赋值前执行，为了复制父类构造函数中的属性、函数
    super(name);
    this.type = 'ContentWriter';
  }
  posts = [];
}

const writer = new ContentWriter('John Smith');

console.log(writer.name); // => 'John Smith'
writer.getName(); // => 'John Smith'
writer.posts; // => []

/*

总结：
类的声明以及ES5、ES6的关联
属性：ES6的属性读写的拦截以及只读
方法：类的静态方法、实例对象的方法，两者的区别以及不同标准的写法
继承：面向对象的重大特性之一，ES5、ES6的写法
*/
