import "./App.css";
import routes from "./routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { theme } from "./theme/MuiTheme";
import { ThemeProvider } from "@emotion/react";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PermissionsProvider } from "./contexts/PermissionsContext";
import { ChatProvider } from "./contexts/ChatContext";
import { SocketProvider } from "./contexts/SocketContext";
import Layout from "./Layouts";

// Adjusted App component
function App() {
  const noHeaderRoutes = ["/", "/permissions"];

  return (
    <div
      className="font-sans"
      style={{ height: "100%", overflow: "hidden", margin: 0, padding: 0 }}
    >
      <PermissionsProvider>
        <SocketProvider>
          <LanguageProvider>
            <ChatProvider>
              <ThemeProvider theme={theme}>
                <Suspense fallback="..loading">
                  {!noHeaderRoutes.includes(location.pathname) && <Header />}
                  <Router>
                    <Routes>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          element={<route.element />}
                        />
                      ))}
                    </Routes>
                  </Router>
                </Suspense>
              </ThemeProvider>
            </ChatProvider>
          </LanguageProvider>
        </SocketProvider>
      </PermissionsProvider>
    </div>
  );
}

export default App;
