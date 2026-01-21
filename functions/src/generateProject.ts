import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as fs from 'fs';
import * as path from 'path';
import JSZip from 'jszip';

interface GenerateRequest {
  projectName: string;
  googleServicesJson: string;
  googleServiceInfoPlist: string;
  authMethods: string[];
  iconBase64?: string;
}

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * Generate a safe filename from project name
 */
function getSafeFileName(projectName: string): string {
  return projectName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Parse bundle ID from GoogleService-Info.plist
 */
function parseBundleId(plist: string): string {
  const match = plist.match(/<key>BUNDLE_ID<\/key>\s*<string>([^<]+)<\/string>/);
  return match ? match[1] : 'com.example.app';
}

/**
 * Parse project info from google-services.json
 */
function parseGoogleServices(json: string): { projectId: string; androidPackage: string } {
  const data = JSON.parse(json);
  return {
    projectId: data.project_info.project_id,
    androidPackage: data.client[0].client_info.android_client_info.package_name,
  };
}

/**
 * Recursively add a directory to a JSZip folder
 */
async function addDirectoryToZip(
  zip: JSZip,
  dirPath: string,
  zipPath: string,
  replacements: Map<string, string | ((content: string) => string)>
): Promise<void> {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const entryZipPath = zipPath ? `${zipPath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await addDirectoryToZip(zip, fullPath, entryZipPath, replacements);
    } else {
      let content: Buffer | string = fs.readFileSync(fullPath);

      // Check if this file needs replacement
      const replacement = replacements.get(entryZipPath);
      if (replacement) {
        if (typeof replacement === 'function') {
          content = replacement(content.toString('utf-8'));
        } else {
          content = replacement;
        }
      } else {
        // Apply text replacements for text files
        const ext = path.extname(entry.name).toLowerCase();
        const textExtensions = ['.json', '.ts', '.tsx', '.js', '.jsx', '.md', '.txt', '.xml', '.plist', '.html', '.css'];
        if (textExtensions.includes(ext)) {
          let text = content.toString('utf-8');
          // Apply global replacements
          for (const [key, value] of replacements) {
            if (key.startsWith('GLOBAL:') && typeof value === 'string') {
              const searchStr = key.replace('GLOBAL:', '');
              text = text.split(searchStr).join(value);
            }
          }
          content = text;
        }
      }

      zip.file(entryZipPath, content);
    }
  }
}

/**
 * Generate CLAUDE.md content for the project
 */
function generateClaudeMd(projectName: string, projectId: string): string {
  return `# ${projectName}

Firebase + Expo React Native starter project. Supports iOS, Android, and Web from a single codebase.

## Structure

- \`/app\` - Expo React Native application (iOS, Android, Web)
- \`/cloud-funcs\` - Firebase Cloud Functions
- \`/security-rules\` - Firestore, Storage, and Realtime Database rules

## Getting Started

### App Setup

\`\`\`bash
cd app
yarn install
npx expo start
\`\`\`

For specific platforms:
- iOS Simulator: Press \`i\` or run \`npx expo run:ios\`
- Android Emulator: Press \`a\` or run \`npx expo run:android\`
- Web Browser: Press \`w\` or run \`npx expo start --web\`

### Deploy Cloud Functions

\`\`\`bash
cd cloud-funcs/functions
yarn install
cd ..
firebase deploy --only functions
\`\`\`

### Deploy Security Rules

\`\`\`bash
cd security-rules
firebase deploy --only firestore:rules,storage,database
\`\`\`

## Key Files

### App Configuration
- \`app/google-services.json\` - Android Firebase config
- \`app/GoogleService-Info.plist\` - iOS Firebase config
- \`app/app.json\` - Expo app configuration (bundle IDs, app name, etc.)

### Authentication
- \`app/utils/auth-methods.ts\` - Enabled authentication providers
- \`app/screens/Login.tsx\` - Login screen
- \`app/screens/Register.tsx\` - Registration screen

### Firebase Rules
- \`security-rules/firestore.rules\` - Firestore security rules
- \`security-rules/storage.rules\` - Cloud Storage security rules
- \`security-rules/database.rules.json\` - Realtime Database rules

## Common Tasks

### Add a new screen
1. Create screen component in \`app/screens/\`
2. Add route in \`app/app/App.tsx\`

### Add a Cloud Function
1. Add function in \`cloud-funcs/functions/index.js\`
2. Deploy with \`firebase deploy --only functions\`

### Modify security rules
1. Edit rules in \`security-rules/\`
2. Test with \`firebase emulators:start\`
3. Deploy with \`firebase deploy --only firestore:rules,storage,database\`

## Firebase Project

This project is configured for Firebase project: \`${projectId}\`

To change projects, update \`.firebaserc\` in each directory.
`;
}

/**
 * Main Cloud Function: Generate project ZIP
 */
export const generateProject = onCall(
  {
    memory: '512MiB',
    timeoutSeconds: 60,
  },
  async (request) => {
    const data = request.data as GenerateRequest;
    const { projectName, googleServicesJson, googleServiceInfoPlist, authMethods, iconBase64 } = data;

    // Validate required fields
    if (!projectName || !googleServicesJson || !googleServiceInfoPlist || !authMethods?.length) {
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    // Parse configuration
    const safeFileName = getSafeFileName(projectName);
    const bundleId = parseBundleId(googleServiceInfoPlist);
    const { projectId, androidPackage } = parseGoogleServices(googleServicesJson);

    // Create ZIP
    const zip = new JSZip();
    const rootFolder = zip.folder(safeFileName);
    if (!rootFolder) {
      throw new HttpsError('internal', 'Failed to create ZIP folder');
    }

    // Add CLAUDE.md to root
    rootFolder.file('CLAUDE.md', generateClaudeMd(projectName, projectId));

    // Prepare replacements for app template
    const appReplacements = new Map<string, string | ((content: string) => string)>();

    // Global replacements (applied to all text files)
    appReplacements.set('GLOBAL:blazefast-starter-expo', safeFileName);
    appReplacements.set('GLOBAL:com.blazefast.ios', bundleId);
    appReplacements.set('GLOBAL:com.blazefast.android', androidPackage);
    appReplacements.set('GLOBAL:BlazeFast React Native Starter', projectName);
    appReplacements.set('GLOBAL:BlazeFast Starter', projectName);

    // Full file replacements
    appReplacements.set('google-services.json', googleServicesJson);
    appReplacements.set('GoogleService-Info.plist', googleServiceInfoPlist);
    appReplacements.set('utils/auth-methods.ts', `export const authMethods = ${JSON.stringify(authMethods)};\n`);

    // Handle icon if provided
    if (iconBase64) {
      const iconBuffer = Buffer.from(iconBase64, 'base64');
      appReplacements.set('assets/images/icon.png', iconBuffer.toString('binary'));
    }

    // Add app template
    const appFolder = rootFolder.folder('app');
    if (appFolder) {
      const appTemplatePath = path.join(TEMPLATES_DIR, 'app');
      await addDirectoryToZip(appFolder, appTemplatePath, '', appReplacements);
    }

    // Prepare .firebaserc content
    const firebaseRcContent = JSON.stringify({ projects: { default: projectId } }, null, 2);

    // Add cloud-funcs template
    const cloudFuncsReplacements = new Map<string, string>();
    cloudFuncsReplacements.set('.firebaserc', firebaseRcContent);

    const cloudFuncsFolder = rootFolder.folder('cloud-funcs');
    if (cloudFuncsFolder) {
      const cloudFuncsTemplatePath = path.join(TEMPLATES_DIR, 'cloud-funcs');
      await addDirectoryToZip(cloudFuncsFolder, cloudFuncsTemplatePath, '', cloudFuncsReplacements);
    }

    // Add security-rules template
    const securityRulesReplacements = new Map<string, string>();
    securityRulesReplacements.set('.firebaserc', firebaseRcContent);

    const securityRulesFolder = rootFolder.folder('security-rules');
    if (securityRulesFolder) {
      const securityRulesTemplatePath = path.join(TEMPLATES_DIR, 'security-rules');
      await addDirectoryToZip(securityRulesFolder, securityRulesTemplatePath, '', securityRulesReplacements);
    }

    // Generate ZIP as base64
    const zipBase64 = await zip.generateAsync({ type: 'base64' });

    return {
      zipBase64,
      filename: `${safeFileName}.zip`,
    };
  }
);
