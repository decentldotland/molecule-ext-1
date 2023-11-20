FROM node:alpine

EXPOSE 3000
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build 

ENV HACKERNOON_API_KEY=<YOUR_API_KEY>
ENV MORALIS_API_TOKEN=<YOUR_API_KEY>
 
CMD [ "node", "dist/api.js" ]
