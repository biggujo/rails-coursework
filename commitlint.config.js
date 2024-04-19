export default {
  extends: [
    '@commitlint/config-conventional',
  ],
  parserPreset: 'conventional-changelog-metahub',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'refactor',
        'style',
        'test',
        'chore',
        'revert',
      ],
    ],
  },
};
