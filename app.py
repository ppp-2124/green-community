from flask import Flask, render_template, send_from_directory
import os

# 创建Flask应用
app = Flask(__name__, 
            static_folder='.', 
            static_url_path='',
            template_folder='.')

# 首页路由
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# 其他页面路由
@app.route('/<path:filename>')
def serve_file(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    return "文件不存在", 404

# 启动服务器
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 