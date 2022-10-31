import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutes  = () => {
    let auth = window.localStorage.getItem("isAuth");
    let role = window.localStorage.getItem("role")
    return(
            auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;