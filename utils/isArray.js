export default function (obj) {
  if (typeof obj !== 'object') {
    return false;
  }
  return Array.isArray(obj);
}
