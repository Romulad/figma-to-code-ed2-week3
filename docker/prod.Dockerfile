FROM node:lts as builder

WORKDIR /tokena

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

# production stage
FROM node:22-alpine

WORKDIR /app

# needed in production for image optimization; check this for more info: https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

RUN addgroup -S nextjs && adduser -S tokena -G nextjs
RUN mkdir .next && chown tokena:nextjs .next

COPY --from=builder --chown=tokena:nextjs /tokena/.next/standalone ./
COPY --from=builder --chown=tokena:nextjs /tokena/.next/static ./.next/static

USER tokena

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node", "server.js" ]