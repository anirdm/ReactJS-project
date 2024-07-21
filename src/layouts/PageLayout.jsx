import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import SearchBar from "../components/searchBar/SearchBar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();

    return (
        
        <div className="flex ">
            { pathname !== '/auth/register' && pathname !== '/auth/login' ? (
                <NavBar />      
            ) : null }
            <div className="flex-1 px-10">
                { pathname !== '/auth/register' && pathname !== '/auth/login' ? (
                    <SearchBar />      
                ) : null }
                {children}
            </div>
        </div>
    )
}

export default PageLayout;

