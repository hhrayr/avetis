export function trimSpace(value) {
  if (value && value.length) {
    return value.replace(/[\s\+]/g, '');
  }
  return value;
}

export function trimMinusSpace(value) {
  if (value && value.length) {
    return value.replace(/[\s\-\+]/g, '');
  }
  return value;
}
