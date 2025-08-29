from fastapi import APIRouter, Response, status, Request, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt, JWTError
from os import getenv
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ADMIN_HASH = getenv("ADMIN_PASSWORD_HASH")
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
JWT_EXPIRY_SECONDS = int(getenv("JWT_EXPIRY_SECONDS", 3600))
JWT_ALGORITHM = "HS256"
COOKIE_NAME = "budgeto-session"


class LoginRequest(BaseModel):
    password: str


@router.get("/me")
def get_me(request: Request):
    require_auth(request)
    return {"authenticated": True}


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


def require_auth(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token"
        )
    decode_token(token)  # Will raise HTTPException if invalid


@router.post("/login")
def login(data: LoginRequest, response: Response):
    if not ADMIN_HASH or not pwd_context.verify(data.password, ADMIN_HASH):
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"detail": "Invalid password"},
        )

    access_token = create_access_token(
        {"sub": "admin"}, timedelta(seconds=JWT_EXPIRY_SECONDS)
    )

    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",  # Allows cookie to be set cross-site
        max_age=JWT_EXPIRY_SECONDS,
    )
    return {"message": "Login successful"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME)
    return {"message": "Logged out"}
