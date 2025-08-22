from fastapi import FastAPI
import psycopg2
from psycopg2 import OperationalError


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
            dbname="budgeto",
            user="postgres",
            password="password",
            host="localhost",
            port="5432",
        )
        conn.close()
        return True
    except OperationalError as e:
        print(e)
        return False
