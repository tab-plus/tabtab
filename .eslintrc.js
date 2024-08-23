module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'max-len': ['error', { code: 150 }],
    'import/no-unresolved': 'off', // 取消自动解析路径，以此开启alias的别名路径设置
    'arrow-parens': ['error', 'as-needed'], // 箭头函数的参数可以不使用圆括号
    'comma-dangle': ['error', 'never'], // 不允许末尾逗号
    'no-underscore-dangle': 'off', //允许标识符中有下划线，从而支持vue中插件的使用
    'linebreak-style': 'off', // 取消换行符\n或\r\n的验证
    'no-param-reassign': 'off', // 允许对函数参数进行再赋值
    'consistent-return': 'off', // 关闭函数中return的检测
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
};
