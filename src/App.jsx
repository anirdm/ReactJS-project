import { BrowserRouter, Route, Routes } from "react-router-dom"
import ExplorePage from "./pages/explorePage/ExplorePage"
import AuthPage from "./pages/authPage/AuthPage"
import DetailsPage from "./pages/detailsPage/DetailsPage"
import PageLayout from "./layouts/PageLayout"

function App() {

  return (
        <BrowserRouter>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<ExplorePage />} />
                    <Route path="/auth/register" element={<AuthPage />} />
                    <Route path="/auth/login" element={<AuthPage />} />
                    <Route path="/post/:_id" element={<DetailsPage />} />
                </Routes>
            </PageLayout>     
        </BrowserRouter>
  )
}

export default App
