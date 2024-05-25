import { BrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from './components/layouts/NavBar'
import Footer from "./components/layouts/Footer";
import Container from "./components/layouts/Container";


export default(( )=>{
    return(
        <div>
            <NavBar/>
            <Container customClass="min-height">
            <Outlet/>
            </Container>
            <Footer/>
        </div>
    )
})