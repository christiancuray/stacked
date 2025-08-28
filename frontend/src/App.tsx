import { HomePage } from "./components/HomePage";
import Layout from "./components/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostsList } from "./components/posts-list";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsList />} />
          <Route
            path="/profile"
            element={
              <div className="p-4">
                <h1>Profile Page</h1>
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div className="p-4">
                <h1>Settings Page</h1>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
