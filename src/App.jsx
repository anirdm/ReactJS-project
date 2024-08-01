import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import ExplorePage from "./pages/explorePage/ExplorePage"
import AuthPage from "./pages/authPage/AuthPage"
import DetailsPage from "./pages/detailsPage/DetailsPage"
import PageLayout from "./layouts/PageLayout"
import ProfilePage from "./pages/profilePage/ProfilePage"
import { useUserAuth, AuthProvider } from "./contexts/AuthContext"

function App() { 
    const { user } = useUserAuth();

    return (
        <BrowserRouter>
                <PageLayout>
                        <Routes>           
                            <Route path="/" element={<ExplorePage />} />
                            <Route path="/auth/register" element={!user ? <AuthPage /> :  <Navigate to='/' /> } />
                            <Route path="/auth/login" element={!user ? <AuthPage /> :  <Navigate to='/' /> } />
                            <Route path="/post/:_id" element={<DetailsPage />} />
                            <Route path="/:username" element={<ProfilePage />} />     
                        </Routes>
                </PageLayout> 
        </BrowserRouter>
    )
}

export default App;
