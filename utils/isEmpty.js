import isArray from '@/utils/isArray';

// проверка объекта на наличие ключей
export default function (obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}

// проверяет пустая ли форма
export function isFormEmpty(obj){
  for (const key in obj) {
    if (isArray(obj[key])) {
      if (obj[key].length > 0) {
        return false;
      }
    } else if (obj[key] && obj[key] !== '') return false;
  }
  return true;
}
