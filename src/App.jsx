import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import ExplorePage from "./pages/explorePage/ExplorePage"
import AuthPage from "./pages/authPage/AuthPage"
import DetailsPage from "./pages/detailsPage/DetailsPage"
import PageLayout from "./layouts/PageLayout"
import ProfilePage from "./pages/profilePage/ProfilePage"
import CreatePost from "./components/createPost/CreatePost"
import EditProfile from "./components/profile/EditProfile"
import { useUserAuth } from "./contexts/AuthContext"
import { UserProfileProvider } from "./contexts/UserProfileContext"
import { PostProvider } from "./contexts/PostContext"
import Spinner from "./components/spinner/Spinner"
import PostCard from "./components/postCard/PostCard"
import PostEdit from "./components/editPost/PostEdit"

function App() {
    const { user, loading } = useUserAuth();

    /*if (loading) {
        return (<Spinner />);
    }*/

    return (
        <BrowserRouter>
            <PageLayout>    
                <PostProvider>
                    <UserProfileProvider>
                        <Routes>
                            <Route path="/" element={loading ? <Spinner /> : <ExplorePage />} />
                            <Route path="/auth/register" element={!user ? <AuthPage /> : <Navigate to='/' />} />
                            <Route path="/auth/login" element={!user ? <AuthPage /> : <Navigate to='/' />} />
                            <Route path="/post/:_id" element={ loading ? <Spinner /> : <DetailsPage />} />
                            <Route path="/post/:_id/edit" element={loading ? <Spinner /> : <PostEdit />} />
                            <Route path="/:username" element={<ProfilePage />} />
                            <Route path="/:username/edit" element={ loading ? <Spinner /> : <EditProfile /> } />
                            <Route path="/post/create" element={ loading ? <Spinner /> : user ? <CreatePost /> : <Navigate to='/auth/login' />} />
                        </Routes>
                    </UserProfileProvider>
                </PostProvider>           
            </PageLayout>
        </BrowserRouter>
    )
}

export default App;
