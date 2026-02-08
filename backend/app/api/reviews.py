from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.models.models import CodeReview, Issue
from app.services.ai_service import analyze_code

router = APIRouter()

class CodeReviewCreate(BaseModel):
    title: str
    language: str
    code: str

class IssueResponse(BaseModel):
    id: int
    severity: str
    category: str
    message: str
    line_number: int | None
    suggestion: str | None

class CodeReviewResponse(BaseModel):
    id: int
    title: str
    language: str
    code: str
    score: float | None
    status: str
    analysis: dict | None
    created_at: datetime
    issues: List[IssueResponse] = []

async def process_review(review_id: int, code: str, language: str, db: AsyncSession):
    """Background task to analyze code"""
    analysis = await analyze_code(code, language)
    
    result = await db.execute(select(CodeReview).where(CodeReview.id == review_id))
    review = result.scalar_one_or_none()
    
    if review:
        review.analysis = analysis
        review.score = analysis.get("score", 0)
        review.status = "completed"
        
        for issue_data in analysis.get("issues", []):
            issue = Issue(
                review_id=review_id,
                severity=issue_data.get("severity", "low"),
                category=issue_data.get("category", "general"),
                message=issue_data.get("message", ""),
                line_number=issue_data.get("line_number"),
                suggestion=issue_data.get("suggestion")
            )
            db.add(issue)
        
        await db.commit()

@router.post("/", response_model=CodeReviewResponse)
async def create_review(
    review_data: CodeReviewCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    review = CodeReview(
        user_id=1,  # TODO: Get from auth
        title=review_data.title,
        language=review_data.language,
        code=review_data.code,
        status="processing"
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)
    
    background_tasks.add_task(process_review, review.id, review_data.code, review_data.language, db)
    
    return review

@router.get("/", response_model=List[CodeReviewResponse])
async def get_reviews(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CodeReview).offset(skip).limit(limit))
    reviews = result.scalars().all()
    return reviews

@router.get("/{review_id}", response_model=CodeReviewResponse)
async def get_review(review_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(CodeReview).where(CodeReview.id == review_id)
    )
    review = result.scalar_one_or_none()
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return review

@router.delete("/{review_id}")
async def delete_review(review_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CodeReview).where(CodeReview.id == review_id))
    review = result.scalar_one_or_none()
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    await db.delete(review)
    await db.commit()
    
    return {"message": "Review deleted successfully"}
