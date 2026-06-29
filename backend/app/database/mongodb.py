from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv(
"MONGO_URL",
"mongodb://admin:admin123@mongodb:27017"
)

client = AsyncIOMotorClient(MONGO_URL)

db = client["keyshell_db"]
