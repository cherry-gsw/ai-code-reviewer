@echo off
echo Starting AI Code Reviewer...
echo.

if not exist "backend\.env" (
    echo Creating .env file...
    copy .env.example backend\.env
    echo Created backend\.env - you can add your OpenAI API key there (optional)
)

echo Starting services with Docker Compose...
docker-compose up --build
