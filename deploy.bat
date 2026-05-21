@echo off
chcp 65001 >nul
echo.
echo  ╔══════════════════════════════════════╗
echo  ║   مطعم دار اليمن — نشر التحديثات   ║
echo  ╚══════════════════════════════════════╝
echo.

cd /d "%~dp0"

:: Check if there are changes
git diff --quiet HEAD 2>nul
if errorlevel 1 goto :has_changes
git status --short | findstr /r "^?" >nul 2>&1
if errorlevel 1 (
    echo  لا توجد تغييرات جديدة للنشر.
    pause
    exit /b 0
)

:has_changes
echo  جاري رفع التحديثات...
echo.

git add -A
git commit -m "update website %date% %time%"
git push origin main

echo.
if errorlevel 1 (
    echo  [خطأ] فشل الرفع. تحقق من الاتصال بالإنترنت.
) else (
    echo  تم النشر بنجاح!
    echo  الموقع سيتحدث خلال 30 ثانية:
    echo  https://daralyemen.pages.dev
)
echo.
pause
