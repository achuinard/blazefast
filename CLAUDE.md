# BlazeFast

Open-source Firebase + Expo project generator. Creates a complete starter project with Expo (iOS, Android, Web), Cloud Functions, and Security Rules.

## Structure

- `/webapp` - Generator web UI (React + Vite + Tailwind)
- `/functions` - Firebase Cloud Functions (TypeScript)
  - `src/generateProject.ts` - ZIP generation logic
  - `templates/` - Bundled starter templates
- `/templates` - Source templates (copied to functions for deployment)

## Development

### Run webapp locally
```bash
cd webapp
yarn install
yarn dev
```

### Run functions emulator
```bash
firebase emulators:start --only functions
```

### Deploy
```bash
yarn --cwd webapp build
firebase deploy
```

## How Generation Works

1. User fills form with project name, Firebase config files, auth methods
2. Frontend calls `generateProject` Cloud Function
3. Function loads templates, applies replacements, creates ZIP
4. ZIP returned as base64, browser triggers download

## Key Replacements (in generateProject.ts)

| Template File | Placeholder | Replaced With |
|--------------|-------------|---------------|
| `app/app.json` | blazefast-starter-expo | safeFileName |
| `app/app.json` | com.blazefast.ios | bundleId from plist |
| `app/app.json` | com.blazefast.android | package from google-services.json |
| `app/utils/auth-methods.ts` | (entire file) | selected auth methods array |
| `app/google-services.json` | (entire file) | user's google-services.json |
| `app/GoogleService-Info.plist` | (entire file) | user's plist |
| `*/.firebaserc` | (entire file) | user's project ID |
