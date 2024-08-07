FROM node:20-alpine AS deps
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]

FROM node:20-alpine AS builder
WORKDIR /app
COPY ["tsconfig.build.json", "tsconfig.json", "./"]
COPY ["src/", "./src/"]
COPY [".env", "./"]
COPY --from=deps /app/node_modules ./node_modules
RUN ["npx", "nest", "build"]

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./
RUN apk update && \
  apk add --no-cache chromium fontconfig font-noto-cjk && \
  fc-cache -f -v
ENV CHROMIUM_LINUX_PATH /usr/bin/chromium-browser
ENV NODE_ENV="production"
CMD ["node", "dist/main"]

EXPOSE 80
