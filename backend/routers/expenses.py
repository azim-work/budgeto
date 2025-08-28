from models import Expense as ExpensesModel
from schemas import Expense as ExpenseSchema
from fastapi import APIRouter, Depends
from db.session import get_session
from sqlalchemy.orm import Session
from typing import List


router = APIRouter()


@router.get("", response_model=List[ExpenseSchema])
def get_expenses(db: Session = Depends(get_session)):
    return db.query(ExpensesModel).all()
