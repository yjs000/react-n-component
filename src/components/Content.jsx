import Info from "@/routes/main/Info.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import RouteManage from "@/routes/main/RouteManage.jsx";

const Content = () => {
    return (
        <div id={"content"}>
            <Outlet/>
        </div>
    );
};

export default Content;
