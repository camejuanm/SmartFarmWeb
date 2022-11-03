import { Outlet, Navigate } from "react-router-dom"

const PrivateRoutesAdmin  = () => {
    let auth = window.localStorage.getItem("isAdmin");
    return(
            auth ? <Outlet/> : <Navigate to="/dashboard"/>
    )
}

export default PrivateRoutesAdmin;