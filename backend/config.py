import os
from dotenv import load_dotenv
from typing import List

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")


CORS_ORIGINS: List = os.getenv("CORS_ORIGINS", "").split(",")
