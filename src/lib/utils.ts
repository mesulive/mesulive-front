export const putUnit = (n: number) => {
  if (n === 0) {
    return "0";
  }

  let i;
  const isMinus = n < 0;
  const inputNumber = n < 0 ? -n : n;
  const unitWords = ['', '만 ', '억 ', '조 ', '경 ', '해 ', '자 '];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  for (i = 0; i < splitCount; i++) {
    let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    resultArray[i] = unitResult;
  }

  for (i = 0; i < resultArray.length; i++) {
    if (resultArray[i] === 0) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return `${isMinus ? "-" : ""}${resultString}`;
}

export const removeUnit = (s: string) => parseInt(s.replace(/[^0-9]/g, ""), 10);

export const sliceString = (s: string, maxLength: number) => {
  if (s.length > maxLength) {
    return s.slice(0, maxLength);
  }
  return s;
}

export const filterValue = (value: any, target: any | any[], replacement: any) => {
  if (Array.isArray(target)) {
    if (target.filter((v) => value === v).length > 0) return replacement;
  } else if (value === target) {
    return replacement;
  }
  return value;
}

export const isEmptyObject = (obj: Object) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const randomPick = (probArr: number[]) => {
  let r = Math.random();
  for (let i = 0; i < probArr.length; i++) {
    if (r < probArr[i]) return i;
    r -= probArr[i];
  }
  return Math.abs(r) > 0.000001 ? -1 : probArr.length - 1;
}