function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout((...args) => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    let now = +new Date();
    if (now - lastTime > delay) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

function myNew(cfn, ...args) {
  let newObj = Object.create(cfn.prototype);
  let res = newObj.apply(this, args);
  return typeof res == "object" ? res : newObj;
}

function myAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(xhr.responseText);
      } else {
        reject("请求失败");
      }
    };
    xhr.send();
  });
}


function distinct1(arr) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArray.indexOf(arr[i])) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}

function distinct2(arr) {
  arr.filter((item, index) => {
    return item.indexOf(arr) === index;
  });
}

// kuaipai
function quickSort(list) {
  let length = list.length;
  if (length < 2) {
    return list;
  }
  let midIndex = Math.floor(length / 2);
  let left = [],
    right = [];
  for (let i = 1; i < length; i++) {
    if (i === midIndex) continue;
    if (list[i] < list[midIndex]) left.push(list[i]);
    else right.push(list[i]);
  }
  return quickSort(left).concat(quickSort(right));
}

quickSort([1, 3, 5, 4, 7, 1, 2, 3, 4]);

const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
};

function myPromiseAll(promiseList) {
  return new Promise((resolve, reject) => {
    let result = [];
    for (promise of promiseList) {
      Promise.resolve(promise)
        .then((res) => {
          result.push(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
    resolve(res);
  });
}

function myPromiseRace(promiseList) {
  return new Promise((resolve, reject) => {
    for (promise of promiseList) {
      Promise.resolve(promise)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

function flat(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
}

const curry =
  (fn, arr = []) =>
  (...args) =>
    ((arg) =>
      arg.length === fn.length ? fn.call(this, ...arg) : curry(fn, arg))([
      ...arr,
      ...args,
    ]);

const levelOrderTraversal = function (node) {
  if (!node) {
    throw new Error("Empty Tree");
  }
  var que = [];
  que.push(node);
  while (que.length !== 0) {
    node = que.shift();
    console.log(node.value);
    if (node.left) que.push(node.left);
    if (node.right) que.push(node.right);
  }
};

function test(arr) {
  let res = [],
    start = arr[0];
  arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] - arr[i] === 0 || arr[i + 1] - arr[i] === 1) {
      continue;
    } else {
      console.log(arr[i]);
      if (start === arr[i]) {
        res.push(`${start}`);
      } else {
        res.push(`${start}->${arr[i]}`);
      }
      start = arr[i + 1];
    }
  }
  return res;
}

test([0, 1, 1, 2, 3, 3, 5, 5, 6, 7, 8, 10, 12, 13, 14]);

// input [0, 1, 1, 2, 3, 3, 5, 5, 6, 7, 8, 10, 12, 13, 14]
// output  ['0->3', '5->8', '10', '12->14']

function sleep(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds);
  });
}

function main(list) {
  let result = [];
  list.forEach((item) => {
    sleep(seconds).then((res) => {
      result.push(res);
    });
  });
  return result;
}

// 原地建堆
// items: 原始序列
// heapSize: 初始有效序列长度
function buildHeap(items, heapSize) {
  // 从最后一个非叶子节点开始，自上而下式堆化
  for (let i = Math.floor(heapSize / 2); i >= 1; --i) {
    heapify(items, heapSize, i);
  }
}

function heapify(items, heapSize, i) {
  // 自上而下式堆化
  while (true) {
    var minIndex = i;
    if (2 * i <= heapSize && items[i] > items[i * 2]) {
      minIndex = i * 2;
    }
    if (2 * i + 1 <= heapSize && items[minIndex] > items[i * 2 + 1]) {
      minIndex = i * 2 + 1;
    }
    if (minIndex === i) break;
    swap(items, i, minIndex); // 交换
    i = minIndex;
  }
}

function swap(items, i, j) {
  let temp = items[i];
  items[i] = items[j];
  items[j] = temp;
}

// 测试
var items = [, 5, 2, 3, 4, 1];
// 因为 items[0] 不存储数据
// 所以：heapSize = items.length - 1
buildHeap(items, items.length - 1);
console.log(items);
// [empty, 1, 2, 3, 4, 5]

function deepClone(obj, hash = new WeakMap()) {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepClone(e);
    });
  } else if (typeof obj === "object" && obj !== null) {
    res = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone(obj[key]);
      }
    }
    hash.set(obj, res);
  } else {
    res = obj;
  }
  return res;
}

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((callback) => {
      callback(...args);
    });
  }

  off(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }

  once(eventName, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(eventName, onceCallback);
    };
    this.on(eventName, onceCallback);
  }
}

const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码

  let res = [];
  let run = Promise.resolve();
  ajaxArray.forEach((item) => {
    run = run.then(item).then((data) => {
      res.push(data);
      return res;
    });
  });
  return run;
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]

class Scheduler {
  constructor() {
    this.count = 2;
    this.queue = [];
    this.run = [];
  }

  add(task) {
    this.queue.push(task);
    if (this.count > 0) {
      this.run.push(task);
      this.count--;
      Promise.resolve()
        .then(task)
        .then(() => this.count++);
    }
  }
}

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output: 2 3 1 4

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4

// 手写题 15 个

// 节流 throttle

function throttle(cb, delay) {
  let pre = 0,
    timer = null;

  return (...argv) => {
    let now = new Date().getTime();
    if (now - pre > delay) {
      cb(...argv);
      pre = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        cb(...argv);
      }, delay);
    }
  };
}

// 防抖 debounce

function debounce(cb, delay) {
  let timer;
  return (argv) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...argv);
    }, delay);
  };
}

// ajax

function myAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, false);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      }
    };
    xhr.send();
  });
}

// 深拷贝

const test = {
  name: "name",
  age: 12,
  say: function () {
    console.log(this.name, this.age);
  }
};

function deepClone(object) {
  if (object == null) return null;
  if (object instanceof Date) return new Date(object);
  if (object instanceof RegExp) return new RegExp(object);
  let newObj = object.constructor();
  Reflect.ownKeys(object).forEach((key) => {
    newObj[key] = object[key];
  });
  return newObj;
}

const test1 = deepClone(test);
console.log(test1);

// 手写 call

Function.prototype.myCall = function (_this, ...argvs) {
  let context = _this;
  context.fn = this;
  let result = context.fn(...argvs);
  delete context.fn;
  return result;
};

// 手写 apply

Function.prototype.myApply = function (_this, argvs) {
  let context = _this;
  context.fn = this;
  let result = context.fn(...argvs);
  delete context.fn;
  return result;
};

// 手写 bind

Function.prototype.MyBind = function (_this) {
  let fn = this,
    bindArgs = Array.prototype.slice.call(arguments, 1);
  return (...argvs) => {
    return fn.call(_this, ...bindArgs, ...argvs);
  };
};

// 柯里化

function curry(fn, ...args) {
  return function () {
    args = [...args, ...arguments];
    if (args.length < fn.length) {
      return curry(fn, ...args);
    } else {
      return fn.call(null, args);
    }
  };
}

const addCurry = curry(function add(a,b,c,d) {
  Array.prototype.reduce.call(...arguments, (pre, cur) => pre + cur);
});

const res = addCurry(1)(2)(3)(4)

console.log(res)

// 快速排序

function quickSort(list) {
  var n = list.length;
  if (n <= 1) return list;

  var midIndex = Math.floor(n / 2);
  var midVal = list[midIndex]; // 取中间的数
  var left = [];
  var right = [];

  for (var i = 0; i < n; i++) {
    if (i === midIndex) continue;
    if (list[i] < midVal) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }

  return quickSort(left).concat(quickSort(right));
}


