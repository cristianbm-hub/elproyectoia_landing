FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci && npx update-browserslist-db@latest

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"] 