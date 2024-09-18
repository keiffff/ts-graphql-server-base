FROM node:20.17.0-slim AS builder

RUN npm install -g pnpm@9.10.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:20.17.0-slim AS production

RUN npm install -g pnpm@9.10.0

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

CMD ["node", "dist/index.js"]
