import { BrowserRouter, Route, Routes } from "react-router-dom"
import ExplorePage from "./pages/ExplorePage/ExplorePage"
import AuthPage from "./pages/AuthPage/AuthPage"

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>     
                <Route path="/auth/register" element={<AuthPage />}  />
                <Route path="/auth/login" element={<AuthPage />}  />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
