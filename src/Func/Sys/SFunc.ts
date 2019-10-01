
export const fSum = (a: any, b: any) => a + b;
export const fMult = (a: any, b: any) => a * b;
export const fDiv = (a: any, b: any) => a / b;

export const fGetFirst = (a: any[]) => a[0];
export const fGet2First = (a: any[]) => fGetFirst(fGetFirst(a));

export const compose = (...fns: any) => (...args: any) => fns.reduceRight((res: any, fn: any) => [fn.call(null, ...res)], args)[0];
