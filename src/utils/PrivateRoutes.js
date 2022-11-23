import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes  = () => {
    let auth = window.sessionStorage.getItem("isAuth");
    return(
        
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;