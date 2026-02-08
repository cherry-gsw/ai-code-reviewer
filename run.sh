#!/bin/bash

echo "🚀 Starting AI Code Reviewer..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example backend/.env
    echo "✅ Created backend/.env - you can add your OpenAI API key there (optional)"
fi

echo "🐳 Starting services with Docker Compose..."
docker-compose up --build
