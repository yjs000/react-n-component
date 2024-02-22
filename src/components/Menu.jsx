import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <header>
            <Link to={""}><div>LOGO</div></Link>
            <ul>
                <li>
                    <Link to={"info"}>정보조회</Link>
                    <ul>
                        <li><Link to={"info"}>노선정보조회</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to={"route-mng"}>GIS 편집</Link>
                    <ul>
                        <li><Link to={"route-mng"}>노선 편집</Link></li>
                        <li><Link to={"station-mng"}>정류장 편집</Link></li>
                    </ul>
                </li>
            </ul>

        </header>
    );
};

export default Menu;
