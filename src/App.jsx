import {useState} from 'react'
import './App.css'
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import axios from "axios";

function App() {
    const [count, setCount] = useState(0)
    axios.post("/api/publicKey");
    return (
        <div className="App">
            <Grid
                style={{
                    height: "400px",
                }}
            >
                <Column field="ProductID" title="ID" width="40px"/>
                <Column field="ProductName" title="Name" width="250px"/>
                <Column field="Category.CategoryName" title="CategoryName"/>
                <Column field="UnitPrice" title="Price"/>
                <Column field="UnitsInStock" title="In stock"/>
            </Grid>
        </div>
    )
}

export default App
