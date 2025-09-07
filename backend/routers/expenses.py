from models import Estimate, Expense as ExpensesModel
from schemas import ExpenseRead, ExpenseCreate
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[ExpenseRead])
def get_expenses(db: Session = Depends(get_session)):
    return db.query(ExpensesModel).all()


@router.post("", response_model=ExpenseRead, status_code=201)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_session)):
    try:
        # Create expense
        new_expense = ExpensesModel(**expense.dict())
        db.add(new_expense)
        # Assigns new_expense.id without full commit
        db.flush()

        # Mirror into estimates
        new_estimate = Estimate(
            date=new_expense.date,
            category=new_expense.category,
            description=new_expense.description,
            amount=new_expense.amount,
            currency=new_expense.currency,
        )
        db.add(new_estimate)

        db.commit()
        db.refresh(new_expense)
        return new_expense

    except Exception:
        db.rollback()
        raise
