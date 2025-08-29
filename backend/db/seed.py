from sqlalchemy.orm import Session
from db.session import engine, Base, SessionLocal
from models import Settings, Expense, DefaultCurrencyEnum, ExpenseCategory
import datetime

# STEP 1: Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# STEP 2: Start DB session
db: Session = SessionLocal()

# STEP 3: Create settings row if not exists
if not db.query(Settings).first():
    db.add(Settings(budget=5000.0, default_currency=DefaultCurrencyEnum.CAD))
    print("✔️ Added default settings")

# STEP 4: Insert some expenses if none exist
if not db.query(Expense).first():
    sample_expenses = []
    db.add_all(sample_expenses)
    print("✔️ Added sample expenses")

# STEP 5: Commit and close
db.commit()
db.close()
print("✅ Seeding complete")
