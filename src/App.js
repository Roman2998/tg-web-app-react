import './App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {
    const {tg} = useTelegram();

    const [dataProductList, setDataProductList] = useState()

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route index element={<ProductList setDataProductList={setDataProductList}/>}/>
                    <Route path={'form'} element={<Form dataProductList={dataProductList}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
