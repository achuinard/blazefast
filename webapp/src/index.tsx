import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { initializeApp } from "firebase/app";

import App from "./app";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const firebaseConfig = {
  apiKey: "AIzaSyAUBLw6J3pnVD4uprEhDYv0QFaeDJR4ohk",
  authDomain: "blazefast-react.firebaseapp.com",
  projectId: "blazefast-react",
  storageBucket: "blazefast-react.appspot.com",
  messagingSenderId: "888454833333",
  appId: "1:888454833333:web:1a7f3f80133ac14bd18afc"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
