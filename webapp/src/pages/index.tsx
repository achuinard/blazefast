import type { FC } from "react";
import ReactNativeFirebaseProjectForm from "../components/ReactNativeFirebaseProjectForm";

const HomePage: FC = function() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/images/logo.png" className="h-12 mr-3" alt="BlazeFast" />
            <h1 className="text-4xl font-bold text-white">BlazeFast</h1>
          </div>
          <p className="text-xl text-gray-400 mb-2">
            Expo + Firebase Starter Generator
          </p>
          <p className="text-gray-500">
            Generate a complete Expo app with Firebase auth, Cloud Functions, and security rules.
            <br />
            One codebase for iOS, Android, and Web.
          </p>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto pb-12">
        <ReactNativeFirebaseProjectForm />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>
          Open source on{" "}
          <a
            href="https://github.com/anthropics/blazefast"
            className="underline hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
