import Test from "@/routes/main/Test.jsx";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import Test2 from "@/routes/main/Test2.jsx";

const Content = () => {
    return (
        <div id={"content"}>
            <Outlet/>
        </div>
    );
};

export default Content;
