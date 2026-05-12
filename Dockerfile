FROM node:20-alpine

WORKDIR /app

# 1. 安装依赖
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install

# 2. 复制源码
COPY . .

# 3. 核心步骤：执行生产环境构建
# 这会将你的 Next.js 代码打包、压缩、优化，显著提升加载速度
RUN npm run build

# 4. 暴露端口
EXPOSE 3000

# 5. 启动生产服务器
# 使用 start 而不是 dev，它会运行编译后的优化代码
CMD ["npm", "run", "start"]