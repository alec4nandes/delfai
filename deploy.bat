@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=You are about to build and deploy. Have you set the IS_DEVELOPMENT variables to false in database.js and functions/index.js? (Y/[N])? 
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

npm run build-deploy

:END
endlocal
