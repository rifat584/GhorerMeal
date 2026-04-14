# Ghorer Meal

> Homemade meal marketplace web app where customers can browse meals, place orders, message chefs, and manage everything from role-based dashboards.

[Live Website](https://ghorermeal.web.app) • [Frontend App](https://ghorermeal.web.app)

---

## Live Demo

- Frontend: [https://ghorermeal.web.app](https://ghorermeal.web.app)
- Backend: `TODO` add your deployed API URL if you want it listed publicly

## Features

- Browse public pages for meals, chefs, contact, about, and how-it-works content
- Explore meals with search, filtering, sorting, pagination, and detailed meal pages
- Create accounts and sign in with Firebase Authentication
- Save favorite meals and submit meal reviews
- Place meal orders and complete payment through Stripe Checkout
- Track customer and chef order flow from separate dashboard views
- Use role-based dashboards for customers, chefs, and admins
- Create and manage meals from the chef dashboard
- Send customer-to-chef messages from a meal page and continue conversations from the dashboard inbox
- Submit chef access requests and contact form messages

---

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack Query
- Tailwind CSS 4
- DaisyUI
- Firebase
- Axios
- Headless UI
- Swiper
- React Hook Form

### Backend

- Node.js
- Express
- MongoDB
- Firebase Admin
- Stripe

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd GhorerMeal
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Create environment files

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### 4. Start the backend

```bash
npm run dev:server
```

### 5. Start the frontend

```bash
npm run dev:client
```

### 6. Build the frontend for production

```bash
npm run build:client
```

---

## Environment Variables

### Frontend: `client/.env`

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### Backend: `server/.env`

```env
PORT=3000
BASE_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
DB_NAME=ghorer_meal
FB_SERVICE_KEY=your_base64_encoded_firebase_service_account
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Usage

### Frontend

- Run the app locally with `npm run dev:client`
- Production build uses `npm run build:client`
- Preview the client build from `client/` with `npm run preview`

### Backend

- Run the API locally with `npm run dev:server`
- Start the production server with `npm run start:server`
- Seed helper scripts are available inside `server/package.json`

---

## Project Structure

```text
GhorerMeal/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utilitis/
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── index.js
│   ├── package.json
│   └── scripts/
├── package.json
└── README.md
```

---

## Future Improvements

- Upgrade messaging from the current request-response flow to real-time chat with Socket.IO
- Add inbox pagination and conversation search for larger message history
- Improve deployment documentation for Firebase Hosting and the backend API
- Add more admin tooling around contact requests and chat moderation if needed

---

## Author

- TODO: add your name, portfolio, and contact links before publishing
