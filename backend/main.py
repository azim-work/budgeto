from fastapi import FastAPI
import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv
import os

# load environment variables
load_dotenv()

app = FastAPI()


@app.get("/health")
async def root():
    # check database connection
    if not can_reach_db():
        return "FAILURE"
    return "OK"


def can_reach_db():

    try:
        conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT", "5432"),  # Default PostgreSQL port
        )
        conn.close()
        return True
    except OperationalError as e:
        print(e)
        return False
