import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/")
        assert response.status_code == 200
        assert "message" in response.json()

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"

@pytest.mark.asyncio
async def test_create_review():
    async with AsyncClient(app=app, base_url="http://test") as client:
        review_data = {
            "title": "Test Review",
            "language": "python",
            "code": "def hello():\n    print('Hello, World!')"
        }
        response = await client.post("/api/reviews/", json=review_data)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Test Review"
        assert data["language"] == "python"

@pytest.mark.asyncio
async def test_get_stats():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/analytics/stats")
        assert response.status_code == 200
        data = response.json()
        assert "total_reviews" in data
        assert "average_score" in data
