##### 信息格式

```js
commitmsg格式：type(scope): subject
type:必选，commit类型
scope:改动影响范围，可选
subject: 修改描述，必选
```

type 类型：

-`feat`: 新增功能
-`fix`：修改bug
-`docs`: 修改文档
-`refactor`：代码重构， 未新增任何功能和修复bug
-`build`：改变构建流程，新增依赖库、工具等(如 webpack 修改)；
-`style`: 仅修改空格、缩减，不改变代码逻辑
-`perf`: 改善性能和体现的修改
-`chore`: 非 `src`和`=test`的修改
-`test`：测试用例的修改
-`ci`: 自动化流程配置修改
-`revert`：回滚到上一个版本