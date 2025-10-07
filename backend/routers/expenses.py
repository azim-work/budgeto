from models import Expense as ExpensesModel
from schemas import ExpenseRead, ExpenseCreate, SourceType
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[ExpenseRead])
def get_expenses(db: Session = Depends(get_session)):
    expenses = db.query(ExpensesModel).order_by(ExpensesModel.date).all()
    return [
        ExpenseRead(
            id=e.id,
            description=e.description,
            amount=e.amount,
            date=e.date,
            currency=e.currency,
            category=e.category,
            source=SourceType.EXPENSE,
        )
        for e in expenses
    ]


@router.post("", response_model=ExpenseRead, status_code=201)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_session)):
    expense = ExpensesModel(**expense.dict())
    db.add(expense)
    db.commit()
    db.refresh(expense)

    return ExpenseRead(
        id=expense.id,
        description=expense.description,
        amount=expense.amount,
        date=expense.date,
        currency=expense.currency,
        category=expense.category,
        source=SourceType.EXPENSE,
    )
