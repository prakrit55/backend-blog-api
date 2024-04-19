FROM node:18 as builder

WORKDIR /build

COPY package*.json .
RUN npm install

COPY src/ src/

COPY tsconfig.json tsconfig.json

RUN npm run build



FROM node:18 as runner

WORKDIR /app

COPY  --from=builder build/package*.json .
COPY --from=builder build/dist dist/

EXPOSE 5000

CMD ["npm", "start"]