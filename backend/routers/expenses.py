from models import Expense as ExpensesModel
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
    expense = ExpensesModel(**expense.dict())
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense
