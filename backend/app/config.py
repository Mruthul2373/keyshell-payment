from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv(
    "MONGO_URL",
    "mongodb://localhost:27017"
)

DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "keyshell"
)

REDIS_HOST = os.getenv(
    "REDIS_HOST",
    "localhost"
)

REDIS_PORT = int(
    os.getenv(
        "REDIS_PORT",
        6379
    )
)

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "keyshell-secret"
)