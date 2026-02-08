# AI Code Reviewer

Automated code review platform that uses AI to analyze code quality, detect security issues, and suggest improvements. Built as a learning project to explore full-stack development with modern tools.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/)
[![React 18](https://img.shields.io/badge/react-18.0+-61dafb.svg)](https://reactjs.org/)

## What it does

- Analyzes code for quality issues and potential bugs
- Detects common security vulnerabilities
- Provides real-time feedback via WebSockets
- Tracks code quality metrics over time
- Supports multiple programming languages

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │◄────►│   FastAPI    │◄────►│ PostgreSQL  │
│  Frontend   │ WS   │   Backend    │      │  Database   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  OpenAI API  │
                     └──────────────┘
```

## Tech Stack

**Backend:** FastAPI, SQLAlchemy (async), PostgreSQL, WebSockets  
**Frontend:** React, TypeScript, Vite, TanStack Query, Tailwind CSS  
**AI:** OpenAI API (optional - has fallback mock analysis)  
**DevOps:** Docker, GitHub Actions

## Setup

### With Docker (recommended)
```bash
docker-compose up --build
```

### Manual setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Environment variables:**
Copy `.env.example` to `.env` and configure (OpenAI key is optional).

API docs available at `http://localhost:8000/docs` when running.

## Testing

```bash
cd backend && pytest --cov=app tests/
cd frontend && npm test
```

## Roadmap

- [x] Basic code analysis
- [x] WebSocket real-time updates
- [x] User authentication
- [ ] GitHub OAuth
- [ ] Custom analysis rules
- [ ] Browser extension

## License

MIT License - see [LICENSE](LICENSE)
