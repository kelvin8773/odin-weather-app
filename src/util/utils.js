String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

export default String;

