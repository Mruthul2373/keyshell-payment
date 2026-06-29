from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import db

app = FastAPI(
    title="KeyShell Payment API",
    version="1.0.0"
)

# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://127.0.0.1:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# MODELS
# --------------------------------------------------

class LoginRequest(BaseModel):
    email: str
    password: str


class User(BaseModel):
    name: str
    email: str
    role: str


class Payment(BaseModel):
    customer: str
    amount: float
    status: str


# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
async def root():
    return {
        "message": "KeyShell Payment Backend Running"
    }


# --------------------------------------------------
# HEALTH
# --------------------------------------------------

@app.get("/health")
async def health():
    return {
        "status": "UP"
    }


# --------------------------------------------------
# MONGODB TEST
# --------------------------------------------------

@app.get("/api/test-db")
async def test_db():

    await db.dashboard.insert_one({
        "status": "Mongo Connected"
    })

    return {
        "message": "MongoDB Connected Successfully"
    }


# --------------------------------------------------
# LOGIN API
# --------------------------------------------------

@app.post("/api/auth/login")
async def login(data: LoginRequest):

    if (
        data.email == "admin@keyshell.com"
        and data.password == "password"
    ):
        return {
            "access_token": "keyshell-demo-token",
            "token_type": "bearer"
        }

    return {
        "message": "Invalid credentials"
    }


# --------------------------------------------------
# USERS API
# --------------------------------------------------

@app.post("/api/users")
async def create_user(user: User):

    await db.users.insert_one(user.model_dump())

    return {
        "message": "User Created Successfully"
    }


@app.get("/api/users")
async def get_users():

    users = []

    async for user in db.users.find():
        user["_id"] = str(user["_id"])
        users.append(user)

    return users


# --------------------------------------------------
# PAYMENTS API
# --------------------------------------------------

@app.post("/api/payments")
async def create_payment(payment: Payment):

    await db.payments.insert_one(payment.model_dump())

    return {
        "message": "Payment Created Successfully"
    }


@app.get("/api/payments")
async def get_payments():

    payments = []

    async for payment in db.payments.find():
        payment["_id"] = str(payment["_id"])
        payments.append(payment)

    return payments


# --------------------------------------------------
# DASHBOARD API
# --------------------------------------------------

@app.get("/api/dashboard")
async def dashboard():

    total_users = await db.users.count_documents({})

    total_payments = await db.payments.count_documents({})

    failed_transactions = await db.payments.count_documents({
        "status": "FAILED"
    })

    revenue = 0

    async for payment in db.payments.find({
        "status": "SUCCESS"
    }):
        revenue += payment.get("amount", 0)

    return {
        "total_users": total_users,
        "total_payments": total_payments,
        "revenue": revenue,
        "failed_transactions": failed_transactions
    }