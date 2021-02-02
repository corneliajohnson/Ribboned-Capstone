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
