# 新冠疫情数据可视化

## 1. 启动后端服务器
```
// 进入server文件夹
cd server

// 启动服务
npm run serve
```

## 2. 启动前端页面

#### yiqing_vue

```
// 技术栈
vue3 + typescript + pinia + echarts

// 进入 yiqing_vue 文件夹
cd yiqing_vue

// 启动服务
npm run dev
```

#### yiqing_react

```
// 技术栈
react + redux + echarts

// 进入 yiqing_react 文件夹
cd yiqing_react

// 启动服务
npm start
```

#### yiqing_uniapp (微信小程序)
```
// 技术栈:  uniapp + vuex + uview

// 注：本项目由 HBuilderX 可视化界面创建，而非 vue-cli 创建

// 1. 下载 HBuilderX 编辑器，在编辑器中打开 yiqing_uniapp 文件夹

// 2. 下载微信小程序开发工具，在 HBuilderX 中打开 yiqing_uniapp 文件夹下的mainifest.json 文件，
      左侧导航栏中选择微信小程序配置，将右侧的微信小程序AppID替换为自己的AppID。
      在 HBuilderX 中，工具 --> 设置 --> 运行配置 --> 微信开发者工具路径中添加安装路径。
      在微信开发者工具中，设置 --> 代理设置 --> 安全 --> 开启服务端口。

// 3. 本项目使用了获取用户位置的功能，需要申请腾讯位置服务。
      在文件路径 pages/center/index.vue中，搜索找到key关键字，并将其中的内容更改为自己的key。
      key可以通过腾讯位置服务官网(https://lbs.qq.com/)登录申请,key必须启用WebServiceAPI和微信小程序服务。

// 4. 完成上述操作后启动服务，在 HBuilderX 中，最上方导航栏 --> 运行 --> 运行到小程序模拟器 --> 微信开发者工具，
      编译完成后自动打开微信开发者工具进行预览。
```