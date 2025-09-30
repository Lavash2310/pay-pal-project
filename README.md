# CardPay - Secure Transaction Management Platform

A modern financial application with React frontend and FastAPI backend for managing cards, transactions, and money transfers.

## Features

- 🔐 User authentication (login/register)
- 💳 Card management (add, remove, set default)
- 💰 Real-time balance updates
- 💸 Send money to other users
- 🏧 Withdraw money from cards
- 📊 Transaction history with filtering
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Toastify for notifications

### Backend
- FastAPI (Python)
- Pydantic for data validation
- JSON file storage (for demo - use proper DB in production)
- CORS middleware for frontend communication

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Set up backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option 2: Run separately

Frontend (runs on http://localhost:5173):
```bash
npm run dev
```

Backend (runs on http://localhost:8000):
```bash
npm run dev:backend
```

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

## Default Login Credentials

For testing purposes, you can use:
- Email: john@example.com
- Password: password123

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── contexts/          # React contexts (Auth)
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── data/              # Mock data (legacy)
├── backend/               # FastAPI backend
│   ├── main.py           # Main FastAPI application
│   ├── requirements.txt  # Python dependencies
│   └── data.json         # JSON storage file
└── public/               # Static assets
```

## Key Features Implementation

### 1. Balance Updates
- Real-time balance updates when sending money or withdrawing
- Balance changes are reflected immediately in the UI
- Backend validates sufficient funds before transactions

### 2. Transaction History
- All money transfers and withdrawals are automatically recorded
- Transactions include timestamps, descriptions, and amounts
- Filterable and searchable transaction history

### 3. Separate Frontend/Backend
- Clean API layer with TypeScript interfaces
- RESTful API design with proper error handling
- CORS configuration for development

## Production Considerations

For production deployment, consider:
- Replace JSON storage with a proper database (PostgreSQL, MongoDB)
- Implement proper authentication with JWT tokens
- Add input validation and sanitization
- Set up proper logging and monitoring
- Use environment variables for configuration
- Implement rate limiting and security headers
- Add comprehensive error handling