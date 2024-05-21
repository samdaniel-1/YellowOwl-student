import { Route,Routes,BrowserRouter } from "react-router-dom";
import Insert from "../components/1.create";
import View from "../components/2.read";
import Update from "../components/3.update";
import Delete from "../components/4.delete";

function Branch(){
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<View/>}/>
        <Route path="/post" element={<Insert/>}/>
        <Route path="/edit/:id" element={<Update/>}/>
        <Route path="/delete/:proid" element={<Delete/>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default Branch
