# 🌍 GlobeTrek Planner

A full-stack MERN travel planning web application with modern UI, JWT authentication,
budget calculator, live weather, itinerary builder, and destination explorer.

---

## 📁 Project Structure

```
globetrek/
├── client/               ← React + Vite frontend
│   └── src/
│       ├── components/   ← Reusable UI components
│       ├── context/      ← Auth & Theme context
│       ├── pages/        ← All page components
│       └── services/     ← Axios API service layer
│
└── server/               ← Node + Express backend
    ├── controllers/      ← Route handlers
    ├── middleware/        ← JWT auth middleware
    ├── models/           ← Mongoose schemas
    └── routes/           ← Express routers
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- **Node.js** v18 or higher → https://nodejs.org
- **MongoDB** (local) or **MongoDB Atlas** (cloud)
  - Local: https://www.mongodb.com/try/download/community
  - Cloud (free): https://www.mongodb.com/atlas
- **npm** (comes with Node.js)

---

## 🚀 Setup Instructions — Step by Step

### Step 1 — Clone / extract the project

```bash
# If you downloaded the ZIP, extract it, then navigate into it:
cd globetrek
```

---

### Step 2 — Set up the Backend (Server)

```bash
# Navigate to the server folder
cd server

# Install all dependencies
npm install

# Create the environment file from the example
cp .env.example .env
```

Now open `server/.env` and set your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/globetrek
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
OPENWEATHER_API_KEY=your_openweather_api_key   ← optional (mock data used if blank)
CLIENT_URL=http://localhost:5173
```

> **MongoDB Atlas** users: replace MONGO_URI with your Atlas connection string, e.g.:
> `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/globetrek`

> **OpenWeatherMap API Key** (free):
> 1. Go to https://openweathermap.org/api
> 2. Register for a free account
> 3. Copy your API key from the dashboard
> 4. Paste it into OPENWEATHER_API_KEY

---

### Step 3 — Start the Backend Server

```bash
# Still inside /server
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 GlobeTrek Server running on http://localhost:5000
```

> **For development with auto-reload:** `npm run dev` (uses nodemon)

---

### Step 4 — Set up the Frontend (Client)

Open a **new terminal window/tab**, then:

```bash
# From the globetrek root folder
cd client

# Install all dependencies
npm install
```

---

### Step 5 — Start the Frontend

```bash
# Still inside /client
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

---

### Step 6 — Open in Browser

Go to: **http://localhost:5173**

1. Click **"Get Started"** on the landing page
2. **Register** a new account
3. Start planning your trips! 🌍

---

## 🔑 API Endpoints

| Method | Endpoint                    | Auth | Description             |
|--------|-----------------------------|------|-------------------------|
| POST   | /api/auth/register          | ❌   | Register user           |
| POST   | /api/auth/login             | ❌   | Login user              |
| GET    | /api/auth/me                | ✅   | Get current user        |
| GET    | /api/trips                  | ✅   | Get all trips           |
| POST   | /api/trips                  | ✅   | Create trip             |
| GET    | /api/trips/:id              | ✅   | Get single trip         |
| PUT    | /api/trips/:id              | ✅   | Update trip             |
| DELETE | /api/trips/:id              | ✅   | Delete trip             |
| GET    | /api/destinations           | ❌   | Get all destinations    |
| GET    | /api/destinations/:id       | ❌   | Get destination by ID   |
| GET    | /api/weather?city=Tokyo     | ✅   | Get weather for a city  |

---

## 🌟 Features

- ✅ JWT Authentication (Register / Login / Logout)
- ✅ Protected routes on both frontend and backend
- ✅ Trip Planner with multi-step form
- ✅ Budget Calculator with sliders and breakdown
- ✅ Transport Mode Selector
- ✅ Day-wise Itinerary Builder
- ✅ Destination Explorer (12 countries, filterable)
- ✅ Live Weather Widget (OpenWeatherMap API)
- ✅ Dark / Light mode toggle
- ✅ Smooth animations (Framer Motion)
- ✅ Fully responsive (mobile + desktop)

---

## 🛠 Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express.js                       |
| Database  | MongoDB + Mongoose                        |
| Auth      | JWT + bcryptjs                            |
| API       | OpenWeatherMap (free tier)                |

---

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running: `mongod` (local) or check your Atlas connection string

**Port already in use?**
- Change PORT in server/.env to e.g. `5001`
- Vite automatically picks an open port

**Weather showing mock data?**
- That's expected if no API key is set. Add your free OpenWeatherMap key to .env

**CORS errors?**
- Make sure CLIENT_URL in server/.env matches your Vite URL (default: http://localhost:5173)

---

## Mohammed Haroon
