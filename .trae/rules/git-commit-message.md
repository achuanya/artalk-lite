---
alwaysApply: true
scene: git_message
---

# Git Commit Message 规范

本规范用于统一 Git 提交信息格式，适用于人工提交，也适用于 AI 根据代码变更自动生成提交信息。

## 1. 基本结构

Commit Message 分为三个部分，使用空行分隔：

```text
<type>(<scope>): <subject>

<body>

<footer>
```

说明：

* 标题行：必填，描述主要修改类型和内容。
* 正文：可选，描述为什么修改、做了什么、实现思路和影响范围。
* 页脚：可选，用于说明 BREAKING CHANGE、Closed Issues、Refs 等信息。

示例：

```text
feat(auth): 添加短信验证码登录能力

为支持移动端用户快速登录，新增短信验证码登录流程。

本次修改主要包括：
- 新增短信验证码发送接口
- 新增验证码校验逻辑
- 调整登录表单，支持手机号和验证码输入
- 增加验证码过期时间和发送频率限制

Closed #128
```

## 2. 标题行规范

标题行格式：

```text
<type>(<scope>): <subject>
```

scope 可省略：

```text
<type>: <subject>
```

存在破坏性变更时，在 type 或 scope 后添加 `!`：

```text
<type>(<scope>)!: <subject>
```

示例：

```text
feat(user): 添加用户偏好设置接口
fix(order): 修复订单金额精度丢失问题
refactor(utils): 重构日期格式化方法
feat(api)!: 调整用户详情接口返回结构
```

标题行要求：

* 必须使用英文半角冒号 `:`
* 冒号后必须有一个空格
* subject 必须简洁明确
* subject 不以句号结尾
* 不要写“修改代码”“更新内容”“优化逻辑”等模糊描述

## 3. type 类型

type 表示本次提交的修改类型，必须从以下类型中选择：

| type     | 含义                            |
| -------- | ----------------------------- |
| feat     | 新功能、新特性                       |
| fix      | 修复 bug                        |
| perf     | 性能优化，不改变功能行为                  |
| refactor | 代码重构，不改变功能行为                  |
| docs     | 文档修改                          |
| style    | 代码格式修改，例如空格、缩进、分号，不是 CSS 样式修改 |
| test     | 测试用例新增或修改                     |
| build    | 构建系统、依赖项、打包配置修改               |
| revert   | 回滚上一次提交                       |
| ci       | 持续集成相关修改                      |
| chore    | 其他无法归类的日常维护修改                 |
| release  | 发布新版本                         |
| workflow | 工作流相关修改                       |

type 判断规则：

* 新增用户可感知功能，使用 `feat`
* 修复已有问题，使用 `fix`
* 只优化性能，使用 `perf`
* 只调整代码结构且不改变行为，使用 `refactor`
* 只修改文档，使用 `docs`
* 只修改格式，使用 `style`
* 只修改测试，使用 `test`
* 修改依赖、构建、打包配置，使用 `build`
* 修改 CI/CD 配置，使用 `ci` 或 `workflow`
* 无法归入以上类型，使用 `chore`
* 回滚历史提交，使用 `revert`
* 发布版本，使用 `release`

当一个提交包含多种修改时，应选择最核心的修改类型。例如：新增功能并补充测试，使用 `feat`；修复 bug 并补充测试，使用 `fix`。如果修改内容过于分散，应拆分提交。

## 4. scope 作用域

scope 表示本次提交影响的范围，可以是模块、目录、页面、组件、功能或配置名称。

示例：

```text
fix(auth): 修复 token 过期后未重新登录的问题
feat(route): 新增动态路由注册逻辑
refactor(component): 重构表单组件状态管理
build(vite): 调整生产环境打包配置
```

常见 scope：

| scope     | 含义        |
| --------- | --------- |
| auth      | 登录、权限、认证  |
| user      | 用户模块      |
| order     | 订单模块      |
| payment   | 支付模块      |
| route     | 路由        |
| component | 公共组件      |
| utils     | 工具方法      |
| api       | 接口请求或接口定义 |
| store     | 状态管理      |
| config    | 配置        |
| build     | 构建        |
| deps      | 依赖        |
| ci        | 持续集成      |
| workflow  | 工作流       |
| docs      | 文档        |
| test      | 测试        |
| global    | 全局影响      |

scope 规则：

* 修改范围明确时，应填写 scope。
* 修改范围较小且难以归类时，可以省略 scope。
* 影响多个模块时，可使用 `global`、`app`、`core` 等较大范围。
* scope 应使用英文小写名词。
* 不要使用无意义 scope，例如 `update`、`change`、`misc`。

## 5. subject 概述

subject 是标题行中的简短说明，用于描述本次提交做了什么。

推荐写法：

```text
fix(form): 修复 checkbox 无法复选的问题
feat(home): 添加网站主页静态页面
perf(list): 优化大数据列表渲染性能
refactor(utils): 重构金额格式化方法
```

不推荐：

```text
fix: 修改 bug
feat: 新增功能
chore: 更新代码
refactor: 优化一下
```

subject 要求：

* 简短明确，建议不超过 50 个中文字符
* 使用动宾结构
* 描述具体修改内容
* 不重复 type 含义
* 不写空泛描述

## 6. body 正文

body 用于补充说明修改背景、修改内容、实现思路和影响范围。

标题行和 body 之间必须空一行。

示例：

```text
fix(order): 修复订单金额计算精度异常

由于订单金额在前端使用浮点数直接计算，部分小数金额会出现精度丢失问题。

本次修改将金额计算统一改为分为单位处理，并在展示层统一格式化为元，避免支付金额和展示金额不一致。
```

body 可包含：

* 为什么修改：问题背景、业务需求、性能瓶颈等
* 修改了什么：新增、调整、删除的内容
* 如何实现：关键实现思路、流程变化、兼容处理
* 影响范围：影响的模块、接口、配置、数据结构或部署流程

推荐格式：

```text
由于 <问题或背景>，当前 <现状或影响>。

本次修改主要包括：
- <修改点 1>
- <修改点 2>
- <修改点 3>

通过 <实现方式>，保证 <结果或收益>。
```

body 规则：

* 不要简单重复 subject
* 多项修改建议使用列表
* 不要编造 diff 中不存在的信息
* 变更很小时可以省略 body

## 7. footer 页脚

footer 用于记录元信息，通常包括：

* `BREAKING CHANGE`
* `Closed #issue`
* `Refs #issue`
* `Reviewed-by`
* `Co-authored-by`

footer 与 body 之间必须空一行。

示例：

```text
fix(login): 修复登录失败后错误提示未清空的问题

登录失败后，旧的错误信息会在下一次输入时继续展示，影响用户判断。

本次修改在用户重新输入账号或密码时清空错误状态。

Closed #256
```

Issue 写法：

```text
Closed #123
Refs #456
```

多个 issue 可分行：

```text
Closed #123
Closed #456
Refs #789
```

## 8. BREAKING CHANGE

当提交包含破坏性变更时，必须：

1. 在标题中添加 `!`
2. 在 body 或 footer 中添加 `BREAKING CHANGE:`

示例：

```text
feat(api)!: 调整用户详情接口返回结构

为支持多语言姓名展示，用户详情接口不再返回单一 name 字段。

本次修改将 name 拆分为 firstName 和 lastName，并同步调整前端用户信息展示逻辑。

BREAKING CHANGE: 用户详情接口中的 name 字段已被移除，调用方需要改为读取 firstName 和 lastName。
```

以下情况通常属于破坏性变更：

* 删除或重命名公开 API
* 修改接口入参或返回结构
* 修改配置字段名或字段含义
* 删除向后兼容逻辑
* 修改数据库结构且需要迁移
* 修改默认行为并可能影响已有调用方
* 升级依赖导致使用方式不兼容

注意：

* `BREAKING CHANGE:` 必须大写
* 冒号后必须有空格
* 使用 `!` 时，必须包含 `BREAKING CHANGE:`

## 9. AI 生成规则

AI 根据 Git diff 生成 commit message 时，应按以下步骤处理：

### 9.1 分析变更

需要判断：

* 修改了哪些文件
* 修改属于功能、修复、重构、测试、文档、构建还是配置
* 是否存在用户可感知行为变化
* 是否存在接口、配置、数据结构或默认行为变化
* 是否存在破坏性变更
* 是否关联 issue、任务编号或 bug 链接

### 9.2 选择 type

根据变更目的选择最准确的 type：

* 新功能：`feat`
* 修复问题：`fix`
* 性能优化：`perf`
* 代码重构：`refactor`
* 文档：`docs`
* 格式：`style`
* 测试：`test`
* 构建或依赖：`build`
* CI/CD：`ci` 或 `workflow`
* 其他维护：`chore`

### 9.3 判断 scope

scope 可从以下信息推断：

* 文件目录
* 模块名称
* 页面名称
* 组件名称
* 服务名称
* 包名
* 配置文件类型

示例：

```text
src/pages/login/index.tsx        -> login 或 auth
src/components/Table/index.tsx   -> table 或 component
src/utils/date.ts                -> utils
.github/workflows/deploy.yml     -> workflow
package.json                     -> deps 或 build
```

### 9.4 编写 subject

subject 应使用中文，简洁描述本次修改。

推荐格式：

```text
<动词><修改对象><修改结果>
```

示例：

```text
添加用户偏好设置接口
修复订单金额精度丢失问题
优化列表滚动性能
重构日期格式化方法
更新生产环境构建配置
```

### 9.5 编写 body

当变更较复杂时，需要生成 body，说明：

* 为什么修改
* 具体改了什么
* 如何实现
* 影响范围是什么

### 9.6 编写 footer

如果存在 issue 编号或任务编号，放入 footer：

```text
Closed #123
Refs #456
```

如果存在破坏性变更，必须放入：

```text
BREAKING CHANGE: <破坏性变更说明>
```

## 10. 常见示例

### fix

```text
fix(global): 修复 checkbox 无法复选的问题
```

```text
fix(common): 修复字体过小的问题

通用管理下多个页面默认字体过小，影响页面可读性。

本次修改将通用管理下所有页面的默认字体大小调整为 14px。
```

```text
fix: 修正 values 字段引用错误

将错误的 value.length 修正为 values.length，避免数组长度判断异常。
```

### feat

```text
feat(home): 添加网站主页静态页面

新增网站主页静态页面，包括顶部导航、主视觉区域、功能介绍和底部信息展示。

Refs #102
```

### chore

```text
chore(table): 将表格中的查看详情改为详情
```

### perf

```text
perf(list): 优化大数据列表渲染性能

原列表在数据量较大时会一次性渲染所有节点，导致页面滚动卡顿。

本次修改引入虚拟滚动，仅渲染可视区域内的数据项，降低页面渲染压力。
```

### refactor

```text
refactor(utils): 重构日期格式化方法

将多个页面中重复的日期格式化逻辑收敛到统一工具方法中，减少重复代码并提升维护性。
```

### docs

```text
docs(readme): 更新项目启动说明

补充本地开发环境变量配置、依赖安装命令和常见启动问题说明。
```

### test

```text
test(auth): 补充登录表单校验测试

新增手机号、密码和验证码输入场景的单元测试，覆盖登录表单的主要校验逻辑。
```

### build

```text
build(deps): 升级 vite 依赖版本

更新 vite 版本并同步调整相关构建配置，修复生产环境构建警告。
```

### ci

```text
ci(deploy): 调整生产环境部署流程

在部署流水线中新增构建产物缓存步骤，减少重复安装依赖的耗时。
```

### workflow

```text
workflow(release): 添加自动发布工作流

新增 GitHub Actions 发布流程，在创建版本标签后自动构建并发布产物。
```

### revert

```text
revert: 回滚用户偏好设置接口变更

回滚上一次用户偏好设置接口相关提交，避免接口字段调整影响现有客户端。
```

### release

```text
release: 发布 v1.4.0

更新版本号和 CHANGELOG，发布 v1.4.0 版本。
```

## 11. AI 输出要求

AI 最终只输出 commit message 内容，不要输出解释、分析过程或额外说明。

简单变更：

```text
fix(form): 修复 checkbox 无法复选的问题
```

复杂变更：

```text
feat(auth): 添加短信验证码登录能力

为支持移动端用户快速登录，新增短信验证码登录流程。

本次修改主要包括：
- 新增短信验证码发送接口
- 新增验证码校验逻辑
- 调整登录表单，支持手机号和验证码输入
- 增加验证码过期时间和发送频率限制

Closed #128
```

破坏性变更：

```text
feat(api)!: 调整用户详情接口返回结构

为支持多语言姓名展示，用户详情接口不再返回单一 name 字段。

本次修改将 name 拆分为 firstName 和 lastName，并同步调整前端用户信息展示逻辑。

BREAKING CHANGE: 用户详情接口中的 name 字段已被移除，调用方需要改为读取 firstName 和 lastName。
```

## 12. 禁止事项

AI 生成 commit message 时禁止：

* 输出“以下是提交信息”等额外说明
* 输出分析 diff 的过程
* 编造代码变更中不存在的内容
* 使用“更新代码”“修改问题”“优化逻辑”等模糊 subject
* 将多个无关修改强行写成一个 commit
* 在没有破坏性变更时使用 `!`
* 使用 `!` 后遗漏 `BREAKING CHANGE:`
* 将 CSS 样式功能变更误判为 `style`
* 将纯格式化修改误判为 `refactor`
* 将依赖或构建修改误判为 `chore`
* 将 CI 配置修改误判为 `build`

## 13. 推荐 AI Prompt

```text
请根据以下 Git diff 生成符合规范的 commit message。

要求：
1. 使用约定式提交格式：<type>(<scope>): <subject>
2. type 必须从以下类型中选择：
   feat, fix, perf, refactor, docs, style, test, build, revert, ci, chore, release, workflow
3. scope 根据修改影响范围自动判断，可以省略
4. subject 使用中文，简洁描述本次修改
5. 如果修改较复杂，需要生成 body，说明为什么修改、做了什么、实现思路和影响范围
6. 如果存在破坏性变更，标题中必须添加 !，并在 footer 中添加 BREAKING CHANGE:
7. 如果有关联 issue，在 footer 中添加 Closed #xxx 或 Refs #xxx
8. 最终只输出 commit message，不要输出解释说明

Git diff:
<粘贴 diff 内容>
```

## 14. 校验规则

合格的 commit message 应满足：

* 标题行存在
* 标题行符合 `<type>(<scope>): <subject>` 或 `<type>: <subject>`
* type 在允许列表中
* 冒号为英文半角冒号
* 冒号后有一个空格
* subject 不为空
* body 与标题行之间有一个空行
* footer 与 body 之间有一个空行
* 存在 `!` 时，必须包含 `BREAKING CHANGE:`
* `BREAKING CHANGE:` 必须大写
* footer 中 issue 关联信息格式清晰
* commit message 能准确反映本次代码变更