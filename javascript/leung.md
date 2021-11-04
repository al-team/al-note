## Alvin this

```JS
var name = 'Nicolas';
function Person(){
    this.name = 'Smiley';
    this.sayName=function(){
        console.log(this);
        console.log(this.name);
    };
    setTimeout(this.sayName, 0);     // 第二次输出
}
var sayName = function (){
    console.log(6666)
}

var person = new Person();
person.sayName();    // 第一次输出

// person{} Smiley
```

```js
var name = "Nicolas";
function Person() {
  this.name = "Smiley";
  this.sayName = () => {
    console.log(this);
    console.log(this.name);
  };
}

let person = new Person(); // window Nicolas
person.sayName.call({ name: "Nicolas2" }); // {}
```

### 闭包 this

```js
var a = {
  b: function () {
    console.log(this);
  },
  C: () => {
    console.log(this);
  },
  d: {
    e: () => {
      console.log(this);
    },
    g: {
      i: () => {
        console.log(this);
      },
    },
  },
  f: function () {
    var a = () => {
      console.log(this);
    };
    a();
  },
};
```

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}

var a = fun(0); // 1. ? undefined
a.fun(1); // ? 0
a.fun(2); // ? 0
a.fun(3); // ? 0
var b = fun(0).fun(1).fun(2).fun(3); // ? undefined 0 1 2
var c = fun(0).fun(1); // ? undefind 0
c.fun(2); // ?   1
c.fun(3); // ?   1
1.undefined
var a =  {
  fn:function (m){
    return fun(m,0)
  }
}
var a =  {
  fn:function (m){
    return fun(m,1)
  }
}

```

```js
const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5);
        console.log('e',e)
      })
      .then(() => {
        console.log(6);
      });
    console.log(7);
  } catch (error) {
    console.log(error)
  }
};
b()

// 1 3 4 7 2 5 6
```
```js
const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    }).then(() => {
        console.log(6);
      });
    console.log(7);
  } catch (error) {
    console.log(error)
  }
};
b()
// 1 3 4 7 2 error
```
```js
const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    }).then(() => {
        console.log(6);
      }).catch(()=>{
        console.log(999)
      });
    console.log(7);
  } catch (error) {
    console.log(error)
  }
};
b()
// 1 3 4 7 2 999
```