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
  const accumulator = (...args) => {
    return args.reduce((acc, curr) => func(acc, curr), initial);
  };
  return accumulator;
};
// !!!
// const accPartial = (func, start, end) => {
//   const accumulator = (...args) => {
//     return args.reduce((acc, curr, index) => {
//       if (index >= start && index <= end) func(acc, curr);
//     }, 0);
//   };
//   return accumulator;
// };
// const accPartial = (func, start, end) => {
//   const accumulator = (...args) => {
//     // const neededArgs = [args[start]]
//     return args.map((value, index) => {
//       if (index >= start && index <= end) {
//         return func(value)
//       } else {
//         return value;
//       }
//     });
//   };
//   return accumulator;
// };
// const addSecondToThird = accPartial(add, 1, 3);
// console.log(addSecondToThird(1, 2, 4, 8)); // [ 1, 6, 8 ]
// const accRecurse = (func, initial) => {
//   const inner = (...args) => {
//     if (args.length === 1) return args[0];
//     const [first, ...rest] = args;
//     return 
//   };
//   return inner;
// };

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
//   accPartial,
//   accRecurse,
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
//   limitb,
//   limit,
//   genFrom,
//   genTo,
//   genFromTo,
//   elementGen,
//   element,
//   collect,
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
