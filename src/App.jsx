import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Info from "@/routes/main/Info.jsx";
import RouteManage from "@/routes/main/RouteManage.jsx";
import Login from "@/routes/Login.jsx";
import Main from "@/routes/Main.jsx";
import StationManage from "@/routes/main/StationManage.jsx";
import '@progress/kendo-theme-default/dist/all.css';

//App.js에서는 route 등 config관리
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path={"/main"} element={<Main/>}>
                        <Route path={"info"} element={<Info/>}></Route>
                        <Route path={"route-mng"} element={<RouteManage/>}></Route>
                        <Route path={"station-mng"} element={<StationManage/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
