# backend/test_main.py

import pytest
# Add ASGITransport to the imports
from httpx import AsyncClient, ASGITransport
from unittest.mock import patch, MagicMock, AsyncMock

# Import your FastAPI app instance
from main import app

@pytest.mark.asyncio
async def test_explain_code_success():
    """Tests a successful request to the /explain endpoint."""
    mock_response = {
        "summary": "This is a mocked summary.",
        "line_by_line": [],
        "suggested_tests": [],
        "potential_refactors": []
    }

    with patch("main.chain", new_callable=MagicMock) as mock_chain:
        mock_chain.ainvoke = AsyncMock(return_value=mock_response)

        # CORRECTED SYNTAX: Use ASGITransport
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.post("/explain", json={
                "code": "print('hello')",
                "language": "python"
            })

        assert response.status_code == 200
        assert response.json() == mock_response
        mock_chain.ainvoke.assert_awaited_once()


@pytest.mark.asyncio
async def test_explain_code_unsupported_language():
    """Tests the validation for an unsupported language."""
    # CORRECTED SYNTAX: Use ASGITransport
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/explain", json={
            "code": "console.log('test')",
            "language": "cobol"
        })
    assert response.status_code == 400
    assert "Unsupported language" in response.json()["detail"]


@pytest.mark.asyncio
async def test_explain_code_empty_code():
    """Tests the validation for an empty code string."""
    # CORRECTED SYNTAX: Use ASGITransport
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/explain", json={
            "code": "  ",
            "language": "python"
        })
    assert response.status_code == 400
    assert "Code cannot be empty" in response.json()["detail"]