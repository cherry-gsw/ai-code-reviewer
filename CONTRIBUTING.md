# Contributing to AI Code Review Dashboard

Thank you for your interest in contributing! 🎉

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/code-review-ai.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `pytest` (backend) and `npm test` (frontend)
6. Commit: `git commit -m "Add your feature"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Code Style

- Python: Follow PEP 8
- TypeScript/React: Use ESLint configuration
- Write meaningful commit messages
- Add tests for new features

## Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Update documentation as needed
- Ensure all tests pass
- Add screenshots for UI changes

## Questions?

Open an issue or reach out to the maintainers!
