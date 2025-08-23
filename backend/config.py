import os
from dotenv import load_dotenv
from typing import List

load_dotenv()

DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

CORS_ORIGINS: List = os.getenv("CORS_ORIGINS", "").split(",")
