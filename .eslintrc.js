module.exports = {
  "parserOptions": { "ecmaVersion": 6 },
  "extends": "airbnb-base",
  rules: {
    'no-shadow': 0,
    'no-param-reassign': 0,
    'eol-last': 0,
    "no-use-before-define": [0, "nofunc"],
    "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
  },
  "env": {
    browser: true
  }
};
