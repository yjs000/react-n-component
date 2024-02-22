import {useState} from 'react'
import './App.css'
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import axios from "axios";
import Menu from "@/components/Menu.jsx";
import Header from "@/components/Header.jsx";
import Content from "@/components/Content.jsx";
import Footer from "@/components/Footer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "@/routes/main/Test.jsx";
import Test2 from "@/routes/main/Test2.jsx";
import Login from "@/routes/Login.jsx";
import Main from "@/routes/Main.jsx";

function App() {
    const [count, setCount] = useState(0)
    axios.post("/api/publicKey");
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login/>}></Route>
                    <Route path={"/main"} element={<Main/>}>
                        <Route path={"menu1"} element={<Test/>}></Route>
                        <Route path={"menu2"} element={<Test2/>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
