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
import { AvatarProvider } from "./providers/AvatarProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AvatarProvider>
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
      </AvatarProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
