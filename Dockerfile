# 使用 Node 的官方镜像作为基础镜像
FROM node:20 AS build

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 构建项目
RUN npm run build

# 使用一个轻量级的镜像来运行构建好的应用
FROM nginx:alpine

# 将构建好的文件从 build 阶段复制到 nginx 的静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
