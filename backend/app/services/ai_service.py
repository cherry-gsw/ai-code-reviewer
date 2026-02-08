from openai import AsyncOpenAI
from app.core.config import settings
import json

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None

async def analyze_code(code: str, language: str) -> dict:
    if not client:
        return _mock_analysis(code, language)
    
    prompt = f"""Analyze this {language} code and provide feedback.
Return JSON with: score (0-100), issues array, summary, strengths, improvements.

Code:
```{language}
{code}
```"""
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a code reviewer. Provide constructive feedback."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except Exception:
        return _mock_analysis(code, language)

def _mock_analysis(code: str, language: str) -> dict:
    lines = code.split('\n')
    issues = []
    
    for i, line in enumerate(lines, 1):
        if 'TODO' in line or 'FIXME' in line:
            issues.append({
                "severity": "low",
                "category": "maintenance",
                "message": "TODO/FIXME comment found",
                "line_number": i,
                "suggestion": "Address or remove this comment"
            })
        if len(line) > 120:
            issues.append({
                "severity": "low",
                "category": "style",
                "message": "Line exceeds 120 characters",
                "line_number": i,
                "suggestion": "Break into multiple lines"
            })
    
    score = max(50, 100 - len(issues) * 5)
    
    return {
        "score": score,
        "issues": issues,
        "summary": f"Analyzed {len(lines)} lines of {language} code",
        "strengths": ["Code is readable"],
        "improvements": ["Add error handling", "Consider adding tests"]
    }

async def get_code_suggestions(code: str, language: str, issue: str) -> str:
    if not client:
        return "Consider adding proper error handling and input validation"
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {"role": "system", "content": "You are a helpful coding assistant."},
                {"role": "user", "content": f"How to fix: {issue}\n\nCode:\n{code}"}
            ]
        )
        return response.choices[0].message.content
    except:
        return "Consider adding proper error handling and input validation"
