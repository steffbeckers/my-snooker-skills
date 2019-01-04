@echo off
call npm run build.dev
echo Push the build live.
call pscp.exe -r C:\dev\mysnookerskills\app\client\dist\* root@dev.steffbeckers.eu:/var/www/mysnookerskills.com/dev/public/
echo Snooker app deployed to dev.mysnookerskills.com!
start "" https://dev.mysnookerskills.com/
pause
