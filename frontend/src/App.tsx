import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components";
import { HomePage, FavoritesPage, SharePage } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/share" element={<SharePage />} />
          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
