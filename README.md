# react-isomorphic

#### 约定
* 安装 [EditorConfig](http://editorconfig.org/#download) 插件
* 使用 [Immutable](https://www.processon.com/view/56fccdc3e4b0bf3d8fbd3047) 时，使用 Immutable.fromJS 来创建对象
* 关于 reducer 的设计，在switch 语句之前，不写任何语句
* 关于 action 的命名规则
  * 平台业务，前缀为 PLATFORM_；其他的 action，前缀为 CUSTOM_
  * 界面交互action的命名：PLATFORM_UI_{Module Description}_{Operation Description}，如 PLATFORM_UI_QUERYSCHEME_SETVISIBLE
  * 数据操作action的命名：PLATFORM_DATA_{Module Description}_{Operation Description}，如：PLATFORM_DATA_FETCH_USERS

#### CLI
``` 
// 项目初始化
npm install

// 开发时，启动后端
npm run debug:server

// 开发时，启动前端
npm run debug:client

// 发布时，前后端程序编译
npm run build

// 发布后，前后端程序启动
npm start
```

#### 文档
* [github Markdown](https://guides.github.com/features/mastering-markdown/)
* [nodemon reload, automatically](http://nodemon.io/)
* [babel-node](https://babeljs.io/docs/usage/cli/)