import "./App.css";
import routes from "./routes";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { theme } from "./theme/MuiTheme";
import { ThemeProvider } from "@emotion/react";
import { Suspense } from "react";
import Header from "./components/Header/Header";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PermissionsProvider } from "./contexts/PermissionsContext";
import { ChatProvider } from "./contexts/ChatContext";
// import { SocketProvider } from "./contexts/SocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const noHeaderRoutes = ["/", "/permissions", "/tutorial"];

  const queryClient = new QueryClient();

  const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
  };

  return (
    <div
      className="font-sans"
      style={{ maxHeight: "100%", overflow: "", margin: 0, padding: 0 }}
    >
      <QueryClientProvider client={queryClient}>
        <PermissionsProvider>
            <LanguageProvider>
              <ChatProvider>
                <ThemeProvider theme={theme}>
                  <Suspense fallback="..loading">
                    <Router>
                      <AppRoutes />
                    </Router>
                  </Suspense>
                </ThemeProvider>
              </ChatProvider>
            </LanguageProvider>
        </PermissionsProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
