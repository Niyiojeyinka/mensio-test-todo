exports.empty = (value) => {
  if (value) {
    if (typeof value !== undefined) {
      return false;
    }
  }
  return true;
};
