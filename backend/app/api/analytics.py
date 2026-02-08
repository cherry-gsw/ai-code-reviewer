from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.models.models import CodeReview, Issue

router = APIRouter()

@router.get("/stats")
async def get_stats(db: AsyncSession = Depends(get_db)):
    total_reviews = await db.execute(select(func.count(CodeReview.id)))
    avg_score = await db.execute(select(func.avg(CodeReview.score)))
    total_issues = await db.execute(select(func.count(Issue.id)))
    
    return {
        "total_reviews": total_reviews.scalar() or 0,
        "average_score": round(avg_score.scalar() or 0, 2),
        "total_issues": total_issues.scalar() or 0
    }

@router.get("/trends")
async def get_trends(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            func.date(CodeReview.created_at).label('date'),
            func.avg(CodeReview.score).label('avg_score'),
            func.count(CodeReview.id).label('count')
        ).group_by(func.date(CodeReview.created_at)).order_by(func.date(CodeReview.created_at))
    )
    
    trends = [
        {
            "date": str(row.date),
            "average_score": round(row.avg_score or 0, 2),
            "review_count": row.count
        }
        for row in result
    ]
    
    return trends

@router.get("/issues/by-severity")
async def get_issues_by_severity(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Issue.severity, func.count(Issue.id)).group_by(Issue.severity)
    )
    
    return {row.severity: row[1] for row in result}
