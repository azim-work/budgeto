import os
from dotenv import load_dotenv
from typing import List

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


CORS_ORIGINS: List = os.getenv("CORS_ORIGINS", "").split(",")
