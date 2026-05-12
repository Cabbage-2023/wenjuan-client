FROM node:20-alpine

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && npm install

# 复制源码
COPY . .

# 暴露 Next.js 端口
EXPOSE 3000

# 按照你的要求：不执行 build，直接运行源码 (Next.js 的开发模式)
CMD ["npm", "run", "dev"]