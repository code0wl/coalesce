module.exports = {
  rules: {
    'interface-name': false,
    'max-classes-per-file': false,
    'member-access': false,
    'member-ordering': false,
    'no-empty-interface': false,
    'object-literal-sort-keys': false,
    'variable-name': [
      true,
      'ban-keywords',
      'check-format',
      'allow-leading-underscore',
      'allow-pascal-case'
    ],
    /* tslint-sonarts overrides */
    'max-union-size': false,
    'no-big-function': false,
    'no-duplicate-string': false,
    'no-identical-functions': false,
    'no-nested-template-literals': false,
    'no-small-switch': false
  }
};
