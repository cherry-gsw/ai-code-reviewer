from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    reviews = relationship("CodeReview", back_populates="user")

class CodeReview(Base):
    __tablename__ = "code_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    language = Column(String, nullable=False)
    code = Column(Text, nullable=False)
    analysis = Column(JSON)
    score = Column(Float)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="reviews")
    issues = relationship("Issue", back_populates="review")

class Issue(Base):
    __tablename__ = "issues"
    
    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("code_reviews.id"))
    severity = Column(String, nullable=False)
    category = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    line_number = Column(Integer)
    suggestion = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    review = relationship("CodeReview", back_populates="issues")
