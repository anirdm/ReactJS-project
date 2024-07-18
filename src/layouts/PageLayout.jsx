import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();

    return (
        
        <div className="flex ">
            { pathname !== '/auth/register' && pathname !== '/auth/login' ? (
                <NavBar />      
            ) : null }
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default PageLayout;

