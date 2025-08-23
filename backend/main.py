from fastapi import FastAPI, Depends
from db import get_session
from sqlalchemy.orm import Session
from routers.settings import router as settings_router

app = FastAPI()


@app.get("/health")
def root(db: Session = Depends(get_session)):
    return "OK"


app.include_router(settings_router, prefix="/settings", tags=["Settings"])
