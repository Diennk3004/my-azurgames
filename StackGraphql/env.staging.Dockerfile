FROM node:18-alpine
WORKDIR /usr/backend
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN rm -rf dist
RUN npm run build
CMD [ "npm","run", "start:staging"]