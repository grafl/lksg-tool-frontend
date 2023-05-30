# docker image rm lksg-tool-frontend:0.0.1-SNAPSHOT && npm install && npm run build && docker build -t lksg-tool-frontend:0.0.1-SNAPSHOT .
# docker run -d --name lksg-tool -p 80:80 lksg-tool-frontend:0.0.1-SNAPSHOT

FROM httpd:2.4
COPY ./build/ /usr/local/apache2/htdocs/
EXPOSE 80
