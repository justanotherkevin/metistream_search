export function isObjectEmpty(object) {
  let isEmpty = true;
  for (let keys in object) {
    isEmpty = false;
    break;
  }
  return isEmpty;
}
export function alphanumeric(inputtxt) {
  var letters = /^[0-9a-zA-Z]+$/;
  if (inputtxt.match(letters)) {
    return true;
  } else {
    return false;
  }
}
export function sanitarize(string) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '\\': '',
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, match => map[match]);
}
export function hideOnClickOutside(element) {
  const outsideClickListener = event => {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      element.classList.add('hide');
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
  const isVisible = elem =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}
