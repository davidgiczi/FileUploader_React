import { Outlet, Link } from "react-router-dom";

const Layout = () => {

return(
    <>
    <nav>
    <div className="layout">
    <p><Link to="/softmagic/home">Kezdőlap</Link></p>
    <p><Link to="/softmagic/upload">Dokumentumok küldése</Link></p>
    <p><Link to="/softmagic/contact">Kapcsolat</Link></p>
    </div>
    </nav>
    <Outlet />
    </>
)
};

export default Layout;