# 🤖 AI Code Reviewer

A production-ready, full-stack code review platform powered by AI. Get instant, intelligent feedback on code quality, security vulnerabilities, and best practices across multiple programming languages.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-18.0+-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-3178c6.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)](https://fastapi.tiangolo.com/)

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
</p>

## 🎯 Use Cases

- **Individual Developers**: Get instant feedback on your code before committing
- **Code Reviews**: Automate initial code review process
- **Learning**: Understand best practices and improve coding skills
- **Quality Assurance**: Maintain consistent code quality across projects

## ✨ Features

- 🤖 **AI-Powered Analysis**: Leverages GPT-4 for intelligent code review
- ⚡ **Real-Time Updates**: WebSocket-based live feedback
- 🔒 **Security Scanning**: Detects vulnerabilities and security issues
- 📊 **Analytics Dashboard**: Visual insights into code quality metrics
- 🎯 **Multi-Language Support**: Python, JavaScript, TypeScript, Java, Go, and more
- 🔄 **Git Integration**: Seamless integration with GitHub repositories
- 📈 **Historical Tracking**: Track code quality improvements over time
- 🎨 **Modern UI**: Beautiful, responsive interface built with React

## 🏗️ Architecture

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

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Docker Setup

```bash
docker-compose up --build
```

## 🔧 Configuration

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/codereview
SECRET_KEY=your-secret-key-here
OPENAI_API_KEY=sk-your-openai-key-here
```

## 📚 API Documentation

Once running, visit:
- API Docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest --cov=app tests/

# Frontend tests
cd frontend
npm test
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: ORM with async support
- **Pydantic**: Data validation
- **WebSockets**: Real-time communication
- **OpenAI API**: AI-powered analysis
- **Alembic**: Database migrations

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **TanStack Query**: Data fetching
- **Zustand**: State management
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization

### DevOps
- **Docker**: Containerization
- **GitHub Actions**: CI/CD
- **PostgreSQL**: Database
- **Nginx**: Reverse proxy

## 📊 Features Roadmap

- [x] Basic code analysis
- [x] Real-time WebSocket updates
- [x] User authentication
- [ ] GitHub OAuth integration
- [ ] Team collaboration features
- [ ] Custom rule engine
- [ ] VS Code extension
- [ ] Slack/Discord notifications

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 👨‍💻 Author

Built with ❤️ by Sreecharan Reddy

## 📧 Contact

For questions or feedback, open an issue or reach out via GitHub.

## 🌟 Show Your Support

Give a ⭐️ if you like this project!
