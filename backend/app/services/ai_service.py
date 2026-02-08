from openai import AsyncOpenAI
from app.core.config import settings
import json
import re

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

async def analyze_code(code: str, language: str) -> dict:
    """Analyze code using AI and return structured feedback"""
    
    if not client:
        return _mock_analysis(code, language)
    
    prompt = f"""Analyze this {language} code and provide a detailed review.
Return a JSON object with:
- score (0-100)
- issues: array of {{severity, category, message, line_number, suggestion}}
- summary: brief overview
- strengths: array of positive aspects
- improvements: array of suggested improvements

Code:
```{language}
{code}
```
"""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are an expert code reviewer. Provide constructive, actionable feedback."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        return _mock_analysis(code, language)

def _mock_analysis(code: str, language: str) -> dict:
    """Fallback mock analysis when OpenAI is not available"""
    lines = code.split('\n')
    issues = []
    
    # Basic static analysis
    for i, line in enumerate(lines, 1):
        if 'TODO' in line or 'FIXME' in line:
            issues.append({
                "severity": "low",
                "category": "maintenance",
                "message": "TODO/FIXME comment found",
                "line_number": i,
                "suggestion": "Address this comment or remove it"
            })
        if len(line) > 120:
            issues.append({
                "severity": "low",
                "category": "style",
                "message": "Line too long",
                "line_number": i,
                "suggestion": "Keep lines under 120 characters"
            })
    
    score = max(50, 100 - len(issues) * 5)
    
    return {
        "score": score,
        "issues": issues,
        "summary": f"Analyzed {len(lines)} lines of {language} code",
        "strengths": ["Code structure is readable"],
        "improvements": ["Consider adding more comments", "Add error handling"]
    }

async def get_code_suggestions(code: str, language: str, issue: str) -> str:
    """Get specific suggestions for fixing an issue"""
    
    if not client:
        return "Add proper error handling and validation"
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a helpful coding assistant."},
                {"role": "user", "content": f"How to fix this issue in {language}: {issue}\n\nCode:\n{code}"}
            ]
        )
        return response.choices[0].message.content
    except:
        return "Add proper error handling and validation"
