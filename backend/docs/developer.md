# 开发者文档

## 端口转发

``` sh
ssh -fNT -L 6379:127.0.0.1:6379 remote.server
```

## 编程环境推荐设置

### Visual Studio Code 推荐设置

在本项目的开发过程中使用了以下 VS Code 插件：

| 插件 ID | 功能 | 配置文件 |
| --- | --- | --- |
| dbaeumer.vscode-eslint | ESLint 插件 | eslintrc.yml |
| streetSideSoftware.code-spell-checker | 拼写检查 | cspell.json |

推荐的 VS Code 设置如下：

``` json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
