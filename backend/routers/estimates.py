from models import Estimate as EstimateModel
from models import Expense as ExpenseModel
from schemas import EstimateRead, EstimateCreate, Combined, EstimateSource
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[EstimateRead])
def get_Estimates(db: Session = Depends(get_session)):
    return db.query(EstimateModel).all()


"""
Combine both expenses and estimates to one "what-if" scenario
"""


@router.get("/combined", response_model=List[Combined])
def get_estimates_combined(db: Session = Depends(get_session)):
    combined: List[Combined] = []
    # locked in transactions
    expenses = db.query(ExpenseModel).all()

    for exp in expenses:
        combined.append(
            Combined(
                id=exp.id,
                description=exp.description,
                amount=exp.amount,
                currency=exp.currency,
                category=exp.category,
                date=exp.date,
                source=EstimateSource.EXPENSE,
            )
        )

    # what if scenarios
    estimates = db.query(EstimateModel).all()
    for est in estimates:
        combined.append(
            Combined(
                id=est.id,
                description=est.description,
                amount=est.amount,
                currency=est.currency,
                category=est.category,
                date=est.date,
                source=EstimateSource.ESTIMATE,
            )
        )

    # sort by date
    combined.sort(key=lambda est: est.date)
    return combined


@router.post("", response_model=EstimateRead, status_code=201)
def add_estimate(estimate: EstimateCreate, db: Session = Depends(get_session)):
    estimate = EstimateModel(**estimate.dict())
    db.add(estimate)
    db.commit()
    db.refresh(estimate)
    return estimate
