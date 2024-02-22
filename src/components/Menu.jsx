import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Link to={"menu1"}><li>menu1</li></Link>
            <Link to={"menu2"}><li>menu2</li></Link>
        </div>
    );
};

export default Menu;
