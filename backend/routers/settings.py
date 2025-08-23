from models import Settings as SettingsModel
from schemas import Settings as SettingsSchema
from fastapi import APIRouter, Depends, HTTPException
from db import get_session
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("", response_model=SettingsSchema)
def get_settings(db: Session = Depends(get_session)):
    settings = db.query(SettingsModel).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings


@router.put("", response_model=SettingsSchema)
def update_settings(
    updated_settings: SettingsSchema, db: Session = Depends(get_session)
):
    settings = db.query(SettingsModel).first()
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")

    settings.budget = updated_settings.budget
    settings.default_currency = updated_settings.default_currency
    db.commit()
    db.refresh(settings)

    return settings
