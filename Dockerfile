# 安装依赖阶段
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
# 这里的复制会包含.env文件用于前端打包需要
# 因为是分阶段构建，只有当前阶段包含.env文件
COPY . .
# 从依赖阶段复制node_modules
COPY --from=deps /app/node_modules ./node_modules
# 执行构建
RUN npm install -g pnpm
RUN pnpm build && pnpm install

# 生产环境阶段
FROM node:20-alpine AS runner
WORKDIR /app
# 复制构建输出
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
# 复制依赖
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

ENV NEXT_TELEMETRY_DISABLED 1

# 通过entrypoint执行脚本来启动应用
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
