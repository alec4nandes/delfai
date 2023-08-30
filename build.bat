@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=You are about to build and deploy. Have you set the IS_DEVELOPMENT variable to false in database.js? (Y/[N])? 
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

rmdir /s /q public
cd delfai-react
npm run build

:END
endlocal
