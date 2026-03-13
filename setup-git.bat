@echo off
echo Initializing Git repository for RailBhoomi...

REM Initialize git repository
git init

REM Add all files
git add .

REM Create initial commit
git commit -m "Initial commit: Railway Complaint Management System"

REM Add remote origin (replace with your GitHub repository URL)
echo Please create a repository on GitHub first, then run:
echo git remote add origin https://github.com/yourusername/railbhoomi.git
echo git branch -M main
echo git push -u origin main

echo.
echo Setup complete! Don't forget to:
echo 1. Create a new repository on GitHub
echo 2. Update your .env file with actual MongoDB credentials
echo 3. Run the commands shown above to push to GitHub

pause