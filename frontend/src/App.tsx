import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContextProvider";
import AppRouter from "./components/route/AppRouter";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
