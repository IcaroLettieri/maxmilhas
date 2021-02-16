# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
COPY ormconfig.docker.json ./ormconfig.json
EXPOSE 3000
CMD node dist/src/server.js

# # stage 2
# FROM node
# WORKDIR /usr/app
# COPY package*.json ./
# RUN yarn install --production

# COPY --from=builder /usr/app/dist ./dist

# COPY ormconfig.docker.json ./ormconfig.json

# EXPOSE 3000
# CMD node dist/src/server.js
