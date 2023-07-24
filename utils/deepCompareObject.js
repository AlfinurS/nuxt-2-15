import isArray from "@/utils/isArray"

// Рекурсивный обход полей объекта со сравнением выражения
export function deepCompareObject(objOrString, search) {
  const regexp = new RegExp(search, 'i');
  if (typeof objOrString === 'number' && objOrString !== undefined) {
    return regexp.test(objOrString.toString());
  }
  if (typeof objOrString === 'string') return regexp.test(objOrString);
  if (isArray(objOrString) || !objOrString) return false;
  let result = false;
  Object.keys(objOrString).forEach((key) => {
    if (deepCompareObject(objOrString[key], search)) { 
      result = true;
    }
  })
  return result;
}
