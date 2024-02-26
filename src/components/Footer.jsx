import {Link} from "react-router-dom";
import {deleteCookie} from "@/cmmn.js";

const Footer = () => {
    return (
        <div>
           <span>footer</span>
            <Link to={"/logout"}>Logout</Link>
        </div>
    );
};

export default Footer;
