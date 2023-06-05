# docker image rm lksg-tool-frontend:0.0.1-SNAPSHOT && npm install && npm run build && docker build -t lksg-tool-frontend:0.0.1-SNAPSHOT .
# docker run -d --name lksg-tool -p 3000:3000 lksg-tool-frontend:0.0.1-SNAPSHOT
# docker run -d --name lksg-tool -p 88:88 lksg-tool-frontend:0.0.1-SNAPSHOT

# FROM httpd:2.4
# COPY ./build/ /usr/local/apache2/htdocs/
# EXPOSE 80

# # Use an official Node runtime as a parent image
# FROM node:14-alpine
# # Set the working directory to /app
# WORKDIR /app
# # Copy package.json and package-lock.json to the container
# COPY package*.json ./
# # Install dependencies
# RUN npm install
# # Copy the rest of the application code to the container
# COPY . .
# # Build the production version of the application
# RUN npm run build
# # Expose port 80 to the outside world
# EXPOSE 88
# # Run the command to start the server
# CMD ["npm", "start"]

FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 88
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
