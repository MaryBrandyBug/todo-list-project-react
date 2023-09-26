export default (btn, filter) => {
  if (btn === filter) {
    return 'current-link';
  }
  return '';
};
