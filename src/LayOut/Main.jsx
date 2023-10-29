import { Outlet } from "react-router-dom";
import App from "../App";
import Footer from "../Page/Shared/Footer/Footer";
import NavBar from "../Page/Shared/Navbar/NavBar";


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;