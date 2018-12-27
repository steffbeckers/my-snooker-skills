@echo off
call npm run build.prod
echo Push the build live.
call pscp.exe -r C:\dev\mysnookerskills\app\client\dist\* root@dev.steffbeckers.eu:/var/www/mysnookerskills.com/app/public/
echo Snooker app deployed to app.mysnookerskills.com!
REM start "" https://app.mysnookerskills.com/
start "" https://app.mysnookerskills.com/
pause
