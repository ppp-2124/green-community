# 网页项目 - Python Flask版本

## 项目简介
这是一个使用Python Flask框架搭建的简易网页服务器，用于展示静态网页内容。该项目将原有的纯前端网页项目转换为可通过PyCharm运行的Python网页应用。

## 项目结构
- `app.py` - Flask应用主文件，处理路由和请求
- `requirements.txt` - 项目依赖文件
- 其他HTML/CSS/JavaScript文件 - 原有的网页前端文件

## 运行方法
1. 确保已安装Python 3.6或更高版本
2. 安装依赖包：
   ```
   pip install -r requirements.txt
   ```
3. 运行应用：
   ```
   python app.py
   ```
4. 在浏览器中访问 `http://localhost:5000` 查看网页

## 技术说明
- 使用Flask框架提供Web服务
- 静态文件（CSS、JS、图片等）通过Flask的静态文件功能提供
- 首页自动重定向到index.html
- 所有其他页面可通过文件名直接访问

## 注意事项
- 应用运行在调试模式下，不建议在生产环境中直接使用
- 默认监听所有网络接口(0.0.0.0)，端口为5000 