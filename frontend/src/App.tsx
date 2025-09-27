import PostPage from "./components/PostPage";
import Layout from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./pages/Login/LoginPage";
import { SignupForm } from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
