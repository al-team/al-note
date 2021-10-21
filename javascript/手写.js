// 手写 instanceof
function myInstanceof(a, b) {
  let cur = a.__proto__,
    prototype = b.prototype;

  while (true) {
    if (cur === prototype) return true;
    if (cur === null) return false;
    cur = cur.__proto__;
  }
}

// 手写 new
function myNew(Father) {
  let obj = Object.create();
  obj.__proto__ = Father.prototype;
  let callback = Father.call(obj);
  return typeof callback === 'object' ? callback : obj;
}

// 手写继承 child.prototype => Father.prototype
function myExtends(Child, Father) {
  function Temp() {}
  Temp.prototype = Father.prototype;
  const instance = new Temp();

  instance.constructor = Child;
  child.prototype = instance;
}

// 手写 call
Funtion.prototype.call2 = function (context = window, ...args) {
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
