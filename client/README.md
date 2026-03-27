# Ghorer Meal Client

This frontend app powers the current Ghorer Meal customer and dashboard experience.

## Setup

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Replace all placeholder values in `.env.local`.

3. Install dependencies:

```bash
npm install
```

4. Start the Vite dev server:

```bash
npm run dev
```

## Required Variables

- `VITE_API_BASE_URL`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_IMGBB_API_KEY`

## Notes

- This app still uses the inherited assignment feature set for now.
- Firebase Hosting uses `client/.firebaserc`, which should be updated with your own project id before deployment.
