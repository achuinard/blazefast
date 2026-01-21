# {{PROJECT_NAME}}

Firebase + Expo React Native starter project. Supports iOS, Android, and Web from a single codebase.

## Structure

- `/app` - Expo React Native application (iOS, Android, Web)
- `/cloud-funcs` - Firebase Cloud Functions
- `/security-rules` - Firestore, Storage, and Realtime Database rules

## Getting Started

### App Setup

```bash
cd app
yarn install
npx expo start
```

For specific platforms:
- iOS Simulator: Press `i` or run `npx expo run:ios`
- Android Emulator: Press `a` or run `npx expo run:android`
- Web Browser: Press `w` or run `npx expo start --web`

### Deploy Cloud Functions

```bash
cd cloud-funcs/functions
yarn install
cd ..
firebase deploy --only functions
```

### Deploy Security Rules

```bash
cd security-rules
firebase deploy --only firestore:rules,storage,database
```

## Key Files

### App Configuration
- `app/google-services.json` - Android Firebase config
- `app/GoogleService-Info.plist` - iOS Firebase config
- `app/app.json` - Expo app configuration (bundle IDs, app name, etc.)

### Authentication
- `app/utils/auth-methods.ts` - Enabled authentication providers
- `app/screens/Login.tsx` - Login screen
- `app/screens/Register.tsx` - Registration screen

### Firebase Rules
- `security-rules/firestore.rules` - Firestore security rules
- `security-rules/storage.rules` - Cloud Storage security rules
- `security-rules/database.rules.json` - Realtime Database rules

## Common Tasks

### Add a new screen
1. Create screen component in `app/screens/`
2. Add route in `app/app/App.tsx`

### Add a Cloud Function
1. Add function in `cloud-funcs/functions/index.js`

### Modify security rules
1. Edit rules in `security-rules/`
2. 
## Firebase Project

This project is configured for Firebase project: `{{PROJECT_ID}}`

To change projects, update `.firebaserc` in each directory.
