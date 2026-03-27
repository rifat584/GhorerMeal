# Ghorer Meal

Ghorer Meal is organized as a single root repository with separate apps for the customer-facing frontend and the backend API. This repo is now set up as a clean fork base, with placeholder service configuration so you can connect it to your own Firebase, MongoDB, and Stripe projects.

## Structure

- `client/` - Vite + React frontend
- `server/` - Express + MongoDB + Firebase Admin API

## Quick Start

1. Copy the example env files:

   ```bash
   cp client/.env.example client/.env.local
   cp server/.env.example server/.env
   ```

2. Replace the placeholder values in those files with your own project credentials.

3. Install frontend dependencies:

   ```bash
   npm --prefix client install
   ```

4. Install backend dependencies:

   ```bash
   npm --prefix server install
   ```

5. Start the frontend:

   ```bash
   npm run dev:client
   ```

6. Start the backend:

   ```bash
   npm run dev:server
   ```

## Replace Later

- `client/.env.local`
  Replace Firebase web config placeholders and `VITE_IMGBB_API_KEY`.
- `server/.env`
  Replace `MONGODB_URI`, `FB_SERVICE_KEY`, and `STRIPE_SECRET_KEY`.
- `client/.firebaserc`
  Replace the placeholder Firebase Hosting project id if you deploy the frontend with Firebase.
- MongoDB
  Create a fresh database for this project. The server now defaults to `ghorer_meal`, or you can set a custom name with `DB_NAME`.

## Notes

- This pass intentionally keeps the existing feature set intact while separating the project identity.
- The current app still contains assignment-era implementation details that can be improved in a later cleanup pass.
