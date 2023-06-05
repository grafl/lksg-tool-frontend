@echo off

call docker container stop lksg-tool
call docker container rm -f lksg-tool
call docker image rm -f lksg-tool-frontend:0.0.1-SNAPSHOT
call del /s /q build\*.*
call npm install
call npm run build
call docker build -t lksg-tool-frontend:0.0.1-SNAPSHOT .
call docker run -d --name lksg-tool -p 80:80 lksg-tool-frontend:0.0.1-SNAPSHOT
