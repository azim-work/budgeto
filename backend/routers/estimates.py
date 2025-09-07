from models import Estimate as EstimateModel
from schemas import EstimateRead, EstimateCreate
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[EstimateRead])
def get_Estimates(db: Session = Depends(get_session)):
    return db.query(EstimateModel).all()


@router.post("", response_model=EstimateRead, status_code=201)
def add_Estimate(Estimate: EstimateCreate, db: Session = Depends(get_session)):
    Estimate = EstimateModel(**Estimate.dict())
    db.add(Estimate)
    db.commit()
    db.refresh(Estimate)
    return Estimate
