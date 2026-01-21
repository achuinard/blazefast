# BlazeFast

Open-source Firebase + Expo project generator. Creates complete, production-ready starter projects with iOS, Android, and Web support from a single codebase.

## What is BlazeFast?

BlazeFast generates a fully configured mobile app starter kit that includes:

- **Expo React Native App** - Cross-platform mobile app with authentication, navigation, and Firebase integration
- **Cloud Functions** - TypeScript backend with example functions including Stripe integration
- **Security Rules** - Pre-configured Firestore, Storage, and Realtime Database rules

No more hours of boilerplate setup. Just provide your Firebase config files, select your auth methods, and download a ready-to-run project.

## How It Works

1. Visit the [BlazeFast Generator](https://blazefast-react.web.app)
2. Enter your app name and upload your icon
3. Upload your Firebase config files (`google-services.json` and `GoogleService-Info.plist`)
4. Select your authentication methods
5. Download the generated ZIP file
6. Run `cd app && npm install && npm start`

## What's Included

### `/app` - Expo React Native Application

A complete mobile app with:

- **Authentication** - Email/password, Google, Facebook, Apple, and anonymous sign-in
- **Navigation** - React Navigation with stack and bottom tabs
- **Firebase Integration** - Pre-configured with 8 Firebase modules:
  - Authentication
  - Firestore
  - Realtime Database
  - Cloud Storage
  - Cloud Functions
  - Analytics
  - Cloud Messaging
  - Crashlytics
- **Demo Screens** - Working examples for each Firebase service
- **UI Components** - Reusable button, text, input, card, and spinner components
- **Charts** - Dashboard with sample charts using react-native-gifted-charts

### `/cloud-funcs` - Firebase Cloud Functions

TypeScript Cloud Functions including:

- Example HTTPS callable function
- Stripe checkout session creation
- Stripe webhook handler

### `/security-rules` - Firebase Security Rules

Pre-configured rules for:

- **Firestore** - User document isolation (`/users/{userId}`)
- **Storage** - User file isolation (`/users/{userId}`)
- **Realtime Database** - User data isolation (`/users/{userId}`)

## Supported Authentication Methods

- Email & Password
- Google Sign-In
- Facebook Login
- Apple Sign-In
- Anonymous (Guest)

## Tech Stack

**Generator:**
- React 18 + Vite + Tailwind CSS
- Firebase Cloud Functions
- TypeScript

**Generated App:**
- Expo SDK 54
- React Native 0.81
- React Navigation
- React Native Firebase
- TypeScript

## Development

### Prerequisites

- Node.js 18+
- yarn
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Run Locally

```bash
# Install dependencies
cd webapp && yarn install

# Start the dev server
yarn dev
```

### Run Functions Emulator

```bash
firebase emulators:start --only functions
```

## Project Structure

```
blazefast-oss/
├── webapp/           # Generator web UI (React + Vite)
├── functions/        # Cloud Functions for ZIP generation
│   ├── src/
│   │   └── generateProject.ts
│   └── templates/    # Bundled templates (copied from /templates)
└── templates/        # Source templates
    ├── app/          # Expo app template
    ├── cloud-funcs/  # Functions template
    └── security-rules/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
