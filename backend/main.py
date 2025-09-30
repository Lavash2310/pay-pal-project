from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
import json
from pathlib import Path

app = FastAPI(title="CardPay API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data storage (in production, use a proper database)
DATA_FILE = Path("data.json")

def load_data():
    if DATA_FILE.exists():
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {
        "users": {},
        "transactions": [],
        "cards": []
    }

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2, default=str)

# Pydantic models
class User(BaseModel):
    id: str
    email: str
    firstName: str
    lastName: str
    balance: float

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str

class Transaction(BaseModel):
    id: str
    userId: str
    date: datetime
    description: str
    amount: float
    type: str  # 'credit' or 'debit'
    category: str
    recipient: str
    status: str

class SendMoneyRequest(BaseModel):
    recipientEmail: str
    amount: float
    note: Optional[str] = ""

class WithdrawRequest(BaseModel):
    amount: float
    cardId: str

class Card(BaseModel):
    id: str
    userId: str
    cardNumber: str
    cardHolder: str
    expiryDate: str
    cvv: str
    type: str
    isDefault: bool

class AddCardRequest(BaseModel):
    cardNumber: str
    cardHolder: str
    expiryMonth: str
    expiryYear: str
    cvv: str

# Initialize with mock data
def init_mock_data():
    data = load_data()
    if not data["users"]:
        # Create mock user
        mock_user = {
            "id": "user-1",
            "email": "john@example.com",
            "firstName": "John",
            "lastName": "Doe",
            "balance": 2540.75,
            "password": "password123"  # In production, hash this
        }
        data["users"]["user-1"] = mock_user
        
        # Create mock transactions
        mock_transactions = [
            {
                "id": "txn-001",
                "userId": "user-1",
                "date": "2025-01-05T10:23:45",
                "description": "Coffee Shop",
                "amount": -4.75,
                "type": "debit",
                "category": "Food & Drink",
                "recipient": "Starbucks",
                "status": "completed"
            },
            {
                "id": "txn-002",
                "userId": "user-1",
                "date": "2025-01-04T14:17:32",
                "description": "Salary Deposit",
                "amount": 2800.00,
                "type": "credit",
                "category": "Income",
                "recipient": "Employer Inc.",
                "status": "completed"
            }
        ]
        data["transactions"] = mock_transactions
        
        # Create mock cards
        mock_cards = [
            {
                "id": "card-1",
                "userId": "user-1",
                "cardNumber": "4111 2222 3333 4444",
                "cardHolder": "John Doe",
                "expiryDate": "09/26",
                "cvv": "123",
                "type": "visa",
                "isDefault": True
            }
        ]
        data["cards"] = mock_cards
        
        save_data(data)

init_mock_data()

# Helper functions
def get_user_by_email(email: str):
    data = load_data()
    for user_id, user in data["users"].items():
        if user["email"] == email:
            return user
    return None

def get_user_by_id(user_id: str):
    data = load_data()
    return data["users"].get(user_id)

def create_transaction(user_id: str, amount: float, transaction_type: str, description: str, recipient: str, category: str = "Transfer"):
    data = load_data()
    
    transaction = {
        "id": f"txn-{uuid.uuid4().hex[:8]}",
        "userId": user_id,
        "date": datetime.now().isoformat(),
        "description": description,
        "amount": amount,
        "type": transaction_type,
        "category": category,
        "recipient": recipient,
        "status": "completed"
    }
    
    data["transactions"].append(transaction)
    save_data(data)
    return transaction

def update_user_balance(user_id: str, amount: float):
    data = load_data()
    if user_id in data["users"]:
        data["users"][user_id]["balance"] += amount
        save_data(data)
        return data["users"][user_id]["balance"]
    return None

# Routes
@app.post("/api/auth/login")
async def login(request: LoginRequest):
    user = get_user_by_email(request.email)
    if not user or user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Remove password from response
    user_response = {k: v for k, v in user.items() if k != "password"}
    return {"user": user_response, "token": f"token-{user['id']}"}

@app.post("/api/auth/register")
async def register(request: RegisterRequest):
    data = load_data()
    
    # Check if user already exists
    if get_user_by_email(request.email):
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_id = f"user-{uuid.uuid4().hex[:8]}"
    new_user = {
        "id": user_id,
        "email": request.email,
        "firstName": request.firstName,
        "lastName": request.lastName,
        "balance": 0.0,
        "password": request.password  # In production, hash this
    }
    
    data["users"][user_id] = new_user
    save_data(data)
    
    # Remove password from response
    user_response = {k: v for k, v in new_user.items() if k != "password"}
    return {"user": user_response, "token": f"token-{user_id}"}

@app.get("/api/user/{user_id}")
async def get_user(user_id: str):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove password from response
    user_response = {k: v for k, v in user.items() if k != "password"}
    return user_response

@app.get("/api/transactions/{user_id}")
async def get_transactions(user_id: str):
    data = load_data()
    user_transactions = [t for t in data["transactions"] if t["userId"] == user_id]
    return sorted(user_transactions, key=lambda x: x["date"], reverse=True)

@app.post("/api/send-money")
async def send_money(request: SendMoneyRequest, user_id: str = "user-1"):  # In production, get from auth token
    data = load_data()
    sender = get_user_by_id(user_id)
    recipient = get_user_by_email(request.recipientEmail)
    
    if not sender:
        raise HTTPException(status_code=404, detail="Sender not found")
    
    if not recipient:
        raise HTTPException(status_code=404, detail="Recipient not found")
    
    if sender["balance"] < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    # Update balances
    update_user_balance(user_id, -request.amount)
    update_user_balance(recipient["id"], request.amount)
    
    # Create transactions
    sender_transaction = create_transaction(
        user_id, 
        -request.amount, 
        "debit", 
        f"Sent to {recipient['firstName']} {recipient['lastName']}", 
        f"{recipient['firstName']} {recipient['lastName']}",
        "Transfer"
    )
    
    recipient_transaction = create_transaction(
        recipient["id"], 
        request.amount, 
        "credit", 
        f"Received from {sender['firstName']} {sender['lastName']}", 
        f"{sender['firstName']} {sender['lastName']}",
        "Transfer"
    )
    
    return {
        "success": True,
        "transaction": sender_transaction,
        "newBalance": get_user_by_id(user_id)["balance"]
    }

@app.post("/api/withdraw")
async def withdraw_money(request: WithdrawRequest, user_id: str = "user-1"):  # In production, get from auth token
    data = load_data()
    user = get_user_by_id(user_id)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user["balance"] < request.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    
    # Find card
    user_card = None
    for card in data["cards"]:
        if card["id"] == request.cardId and card["userId"] == user_id:
            user_card = card
            break
    
    if not user_card:
        raise HTTPException(status_code=404, detail="Card not found")
    
    # Update balance
    new_balance = update_user_balance(user_id, -request.amount)
    
    # Create transaction
    transaction = create_transaction(
        user_id,
        -request.amount,
        "debit",
        "ATM Withdrawal",
        f"Card ending in {user_card['cardNumber'][-4:]}",
        "Withdrawal"
    )
    
    return {
        "success": True,
        "transaction": transaction,
        "newBalance": new_balance
    }

@app.get("/api/cards/{user_id}")
async def get_cards(user_id: str):
    data = load_data()
    user_cards = [c for c in data["cards"] if c["userId"] == user_id]
    return user_cards

@app.post("/api/cards")
async def add_card(request: AddCardRequest, user_id: str = "user-1"):  # In production, get from auth token
    data = load_data()
    
    card_id = f"card-{uuid.uuid4().hex[:8]}"
    new_card = {
        "id": card_id,
        "userId": user_id,
        "cardNumber": request.cardNumber,
        "cardHolder": request.cardHolder,
        "expiryDate": f"{request.expiryMonth}/{request.expiryYear}",
        "cvv": request.cvv,
        "type": "visa",  # Default to visa
        "isDefault": len([c for c in data["cards"] if c["userId"] == user_id]) == 0
    }
    
    data["cards"].append(new_card)
    save_data(data)
    
    return new_card

@app.delete("/api/cards/{card_id}")
async def remove_card(card_id: str, user_id: str = "user-1"):  # In production, get from auth token
    data = load_data()
    
    # Find and remove card
    card_index = None
    for i, card in enumerate(data["cards"]):
        if card["id"] == card_id and card["userId"] == user_id:
            card_index = i
            break
    
    if card_index is None:
        raise HTTPException(status_code=404, detail="Card not found")
    
    data["cards"].pop(card_index)
    save_data(data)
    
    return {"success": True}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)