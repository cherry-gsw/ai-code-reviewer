# Contributing

Thanks for checking this out! Here's how to get started:

## Setup

1. Fork and clone the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `pytest` (backend) and `npm test` (frontend)
5. Commit and push
6. Open a PR

## Development

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

## Guidelines

- Follow existing code style
- Add tests for new features
- Keep commits focused
- Update docs if needed
