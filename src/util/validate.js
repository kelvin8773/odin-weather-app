const Validate = (() => {
  const check = (value, test) => {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const cityRegExp = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const countryRegExp = /^[a-zA-Z]+/;
    const zipCodeRegExp = /^[0-9]{6}/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (test === 'email') return value.length !== 0 && emailRegExp.test(value);
    if (test === 'city') return value.length !== 0 && cityRegExp.test(value);
    if (test === 'country') return value.length !== 0 && countryRegExp.test(value);
    if (test === 'zipCode') return value.length !== 0 && zipCodeRegExp.test(value);
    if (test === 'password') return value.length !== 0 && passwordRegExp.test(value);
  }

  return {
    check,
  }

})();

export default Validate;
