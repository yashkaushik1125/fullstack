FROM node

WORKDIR /app

COPY . /app

RUN npm install

CMD ["node","src/index.js"]

EXPOSE 3000
