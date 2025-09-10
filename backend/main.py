# backend/main.py

import uvicorn
import bleach
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# --- Rate Limiting Imports ---
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# LangChain Imports
from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# --- CORRECTED IMPORT: Use Pydantic V2 directly ---
from pydantic import BaseModel, Field

# --- Rate Limiter Instance ---
limiter = Limiter(key_func=get_remote_address)

# --- App Declaration ---
app = FastAPI(
    title="GenAI Code Explainer API",
    description="An API to explain code snippets using a local Llama 3 model.",
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# --- CORS Configuration ---
origins = ["http://localhost:3000", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Structured Output (Updated to use BaseModel from Pydantic V2) ---

class LineByLineExplanation(BaseModel): # <-- CHANGED: No more 'V1BaseModel'
    line: int = Field(description="The line number.")
    explanation: str = Field(description="A beginner-friendly explanation.")

class SuggestedRefactor(BaseModel): # <-- CHANGED
    area: str = Field(description="The area for refactoring.")
    suggestion: str = Field(description="A concrete suggestion.")

class SuggestedTest(BaseModel): # <-- CHANGED
    test_case: str = Field(description="A description of the test case.")
    description: str = Field(description="Why this test is important.")

class CodeExplanation(BaseModel): # <-- CHANGED
    """The complete, structured explanation of a code snippet."""
    summary: str = Field(description="A high-level summary.")
    line_by_line: List[LineByLineExplanation] = Field(description="Line-by-line breakdown.")
    suggested_tests: List[SuggestedTest] = Field(description="Suggested test cases.")
    potential_refactors: List[SuggestedRefactor] = Field(description="Potential refactors.")


# --- LangChain setup ---
llm = ChatOllama(model="llama3:latest", temperature=0.2, format="json")
parser = JsonOutputParser(pydantic_object=CodeExplanation)
prompt_template = """
You are a senior software developer...
Analyze the following code snippet in {language}:
```{code}```
Provide your explanation in JSON format: {format_instructions}
"""
prompt = ChatPromptTemplate.from_template(
    template=prompt_template,
    partial_variables={"format_instructions": parser.get_format_instructions()},
)
chain = prompt | llm | parser

# --- API Endpoint and data models ---
class CodePayload(BaseModel): # <-- CHANGED (for consistency, though it already used the correct one)
    code: str = Field(..., max_length=10000)
    language: str

SUPPORTED_LANGUAGES = {"python", "javascript", "java"}

@app.post("/explain")
@limiter.limit("10/minute")
async def explain_code(request: Request, payload: CodePayload):
    if payload.language.lower() not in SUPPORTED_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported language. Use one of: {', '.join(SUPPORTED_LANGUAGES)}"
        )
    if not payload.code.strip():
        raise HTTPException(status_code=400, detail="Code cannot be empty.")

    sanitized_code = bleach.clean(payload.code)

    try:
        response = await chain.ainvoke({
            "language": payload.language,
            "code": sanitized_code
        })
        return response
    except Exception as e:
        print(f"An error occurred while processing the request: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error communicating with the AI model. Please try again."
        )

@app.get("/")
def read_root():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)