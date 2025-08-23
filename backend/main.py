from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from db import get_session
from sqlalchemy.orm import Session
from routers.settings import router as settings_router
import config

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def root(db: Session = Depends(get_session)):
    return "OK"


app.include_router(settings_router, prefix="/settings", tags=["Settings"])
