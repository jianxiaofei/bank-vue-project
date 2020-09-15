module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // feat: 新功能。
    // docs: 文档
    // chore: 构建过程或辅助工具的变动
    // refactor: 重构
    // fix: 修补bug
    // style: 样式
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'reactor', 'test', 'chore', 'revert', 'build', 'perf', 'ci', 'revert']],
    'type-empty': [2, 'always'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
}

// commitmsg格式：type(scope): subject
// type: 必选，commit类型
// scope：改动影响范围，可选
// subject：修改描述，必选
