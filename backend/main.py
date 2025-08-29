from fastapi import FastAPI, Depends, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db.session import get_session

from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from routers.settings import router as settings_router
from routers.expenses import router as expenses_router
from routers.auth import router as auth_router
from routers.auth import decode_token
import config

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def root(db: Session = Depends(get_session)):
    return "OK"


@app.middleware("http")
async def require_auth_cookie(request: Request, call_next):
    allowed_paths = [
        "/auth/login",
        "/auth/logout",
        "/health",
        "/docs",
        "/openapi.json",
        "/auth/me",
    ]
    if request.url.path in allowed_paths:
        return await call_next(request)

    token = request.cookies.get("budgeto-session")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")

    decode_token(token)  # Will raise if invalid

    return await call_next(request)


app.include_router(settings_router, prefix="/settings", tags=["Settings"])
app.include_router(expenses_router, prefix="/expenses", tags=["Expenses"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
