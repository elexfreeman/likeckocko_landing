const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const fToArr = (s) => s.split('');

const fToUpc = (s) => s.toUpperCase();

const fToUpperCaseArr = (aS) => aS.map(fToUpc);

const fToStr = (aS) => aS.join('_');

const s = 'Привет';


const out = compose(fToStr, fToUpperCaseArr, fToArr);
const tOut = fToStr(fToUpperCaseArr(fToArr(s)))
console.log(out(s), tOut);

console.log('П_Р_И_В_Е_Т' == out(s));

