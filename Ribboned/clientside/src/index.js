import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Ribboned } from "./components/Ribboned";
import "./index.css";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { SourceProvider } from "./providers/SourceProvider";
import { RibbonProvider } from "./providers/RibbonProvider";
import { SnagProvider } from "./providers/SnagProvider";
// import "firebase/storage";
// import firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnagProvider>
        <RibbonProvider>
          <SourceProvider>
            <CategoryProvider>
              <UserProfileProvider>
                <Ribboned />
              </UserProfileProvider>
            </CategoryProvider>
          </SourceProvider>
        </RibbonProvider>
      </SnagProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
