import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Info from "@/routes/main/Info.jsx";
import RouteManage from "@/routes/main/RouteManage.jsx";
import Main from "@/routes/Main.jsx";
import StationManage from "@/routes/main/StationManage.jsx";
import '@progress/kendo-theme-default/dist/all.css';
import NotFound from "@/routes/NotFound.jsx";
import Divider from "@/routes/Divider.jsx";
import Login from "@/routes/Login.jsx";
import AuthRoute from "@/routes/AuthRoute.jsx";
import Logout from "@/routes/Logout.jsx";

//App.js에서는 route 등 config관리
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Divider />}/>
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/logout"} element={<Logout/>} />
                    <Route path={"/main"} element={<Main/>}>
                        <Route path={"info"} element={<Info/>}></Route>
                        <Route path={"route-mng"} element={<RouteManage/>}></Route>
                        <Route path={"station-mng"} element={<StationManage/>}></Route>
                        <Route path={"*"} element={<NotFound/>}></Route>
                    </Route>
                    <Route path={"*"} element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
