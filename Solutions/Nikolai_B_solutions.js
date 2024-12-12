const identity = (x) => x;
const addb = (a, b) => a + b;
const subb = (a, b) => a - b;
const mulb = (a, b) => a * b;
const minb = (a, b) => Math.min(a, b);
const maxb = (a, b) => Math.max(a, b);

const add = (...nums) => nums.reduce((acc, curr) => acc + curr, 0);
const sub = (...nums) => nums.reduce((acc, curr) => acc - curr);
const mul = (...nums) => nums.reduce((acc, curr) => acc * curr, 1);
const min = (...nums) => Math.min(...nums);
const max = (...nums) => Math.max(...nums);

const addRecurse = (...nums) => {
  if (nums.length === 0) return 0;
  const [first, ...rest] = nums;
  return first + addRecurse(...rest);
};
const mulRecurse = (...nums) => {
  if (nums.length === 0) return 0;
  const [first, ...rest] = nums;
  return first * addRecurse(...rest);
};
const minRecurse = (...nums) => {
  if (nums.length === 1) return nums[0];
  const [first, ...rest] = nums;
  const minOfRest = minRecurse(...rest);
  return first < minOfRest ? first : minOfRest;
};
const maxRecurse = (...nums) => {
  if (nums.length === 1) return nums[0];
  const [first, ...rest] = nums;
  const maxOfRest = maxRecurse(...rest);
  return first > maxOfRest ? first : maxOfRest;
};

const not = (func) => (arg) => (func(arg) === true ? false : true);

const acc = (func, initial) => {
  return (...args) => {
    return args.reduce((acc, curr) => func(acc, curr), initial);
  };
};

const accPartial = (func, start, end) => {
  return (...args) => {
    const result = [...args];
    const subset = args.slice(start, end);
    const accumulatedValue = func(...subset);
    result.splice(start, subset.length, accumulatedValue);
    return result;
  }
};
const accRecurse = (func, initial) => {
  const inner = (...args) => {
    if (args.length === 0) return initial;
    const [first, ...rest] = args;
    const newInitial = func(initial, first);
    return inner(...rest);
  };
  return inner;
};

const fill = (num) => Array(num).fill(num);
const fillRecurse = (num) => {
  const inner  = (counter, acc) => {
    if (counter === 0) return acc;
    acc.push(num);
    return inner(counter - 1, acc);
  };
  return inner(num, []);
};

const set = (...args) => Array.from(new Set(args));

const identityf = (x) => () => x;

const addf = (a) => (b) => a + b;
const liftf = (binary) => (a) => (b) => binary(a, b);
const pure = (x, y) => {
  let localY = y;
  let localZ;

  const localImpure = (x) => {
    localY++;
    localZ = x * localY;
  };
  localImpure(x);
  return [localZ, localY];
};

const curryb = (binary, a) => (b) => binary(a, b);
const curry = (func, ...outer) => {
  const curried = (...inner) => {
    const args = [...outer, ...inner];
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return curry(func, ...args);
    }
  };
  return curried;
};

const inc = (x) => x + 1;

const twiceUnary = (binary) => (arg) => binary(arg, arg);
const doubl = (x) => twiceUnary(addb)(x);
const square = (x) => twiceUnary(mulb)(x);
const twice = (func) => (...args) => {
  const twicedArr = Array([args].length * 2).fill(args).flat();
  return twicedArr.reduce((acc, curr) => func(acc, curr) , 0);
};

const reverseb = (binary) => (a, b) => binary(b, a);
const reverse = (func) => (...args) => {
  const reversedArgs = [...args].reverse();
  return func(...reversedArgs);
};

const composeuTwo = (unary1, unary2) => (x) => unary2(unary1(x));
const composeu = (...funcs) => (x) => {
  const [ initialFunc, ...rest ] = funcs;
  const initialValue = initialFunc(x);
  return rest.reduce((acc, curr) => curr(acc), initialValue);
};

const composeb = (binary1, binary2) => (...args) => {
  const [first, second, ...rest] = args;
  return binary2(binary1(first, second), rest);
};
const composeTwo = (func1, func2) => (...args) => {
  const firstFuncResult = acc(func1, null)(...args);
  return func2(firstFuncResult);
};

const compose = (...funcs) => (...args) => {};

const limitb = (binary, lmt) => {
  let count = 0;
  return (a, b) => {
    if (count < lmt) {
      count += 1;
      return binary(a, b);
    }
    return undefined;
  };
};

const limit = (func, lmt) => {
  let count = 0;
  return (...args) => {
    if (count < lmt) {
      count += 1;
      return func(...args);
    }
    return undefined;
  };
};

const genFrom = (num) => {
  let current = num;
  return {
    next: () => ({
      value: current++,
      done: false,
    })
  };
};

const genTo = (gen, lmt) => {
  return {
    next: () => {
      const item = gen.next();
      if (item.done || item.value >= lmt) {
        return { done: true };
      }
      return item;
    }
  };
};

const genFromTo = (start, end) => {
  let current = start;
  return {
    next: () => {
      if (current < end) {
        return { value: current++, done: false }
      } else {
        return { done: true }
      }
    }
  };
};

const elementGen = (array, gen) => {
  return {
    next: () => {
      const indexObj = gen.next();
      if (indexObj.done || indexObj.value >= array.length) {
        return { done: true };
        
      } else {
        return { value: array[indexObj.value], done: false };
      }
    }
  };
};

const element = (array, gen = null) => {
  let index = 0;
  return {
    next: () => {
      const genObj = gen ? gen.next() : { value: index++, done: false };
      if (genObj.value >= array.length) {
        return { done: true };
      } else {
        return { value: array[genObj.value], done: genObj.done };
      }
    }
  };
};

const collect = (gen, array) => {
  return {
    next: () => {
      const indexObj = gen.next();
      if (indexObj.done) {
        return { done: true };
        
      } else {
        const value = indexObj.value;
        array.push(value);
        return { value, done: false };
      }
    }
  };
};

module.exports = {
  identity,
  addb,
  subb,
  mulb,
  minb,
  maxb,
  add,
  sub,
  mul,
  min,
  max,
  addRecurse,
  mulRecurse,
  minRecurse,
  maxRecurse,
  not,
  acc,
  accPartial,
  accRecurse,
  fill,
  fillRecurse,
  set,
  identityf,
  addf,
  liftf,
  pure,
  curryb,
  curry,
  inc,
  twiceUnary,
  doubl,
  square,
  twice,
  reverseb,
  reverse,
  composeuTwo,
  composeu,
  composeb,
  composeTwo,
  compose,
  limitb,
  limit,
  genFrom,
  genTo,
  genFromTo,
  elementGen,
  element,
  collect,
//   filter,
//   filterTail,
//   concatTwo,
//   concat,
//   concatTail,
//   gensymf,
//   gensymff,
//   fibonaccif,
//   counter,
//   revocableb,
//   revocable,
//   extract,
//   m,
//   addmTwo,
//   addm,
//   liftmbM,
//   liftmb,
//   liftm,
//   exp,
//   expn,
//   addg,
//   liftg,
//   arrayg,
//   continuizeu,
//   continuize,
//   vector,
//   exploitVector,
//   vectorSafe,
//   pubsub,
//   mapRecurse,
//   filterRecurse,
};
