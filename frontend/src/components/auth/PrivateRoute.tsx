import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

export default function PrivateRoute(){
    const {token}=useAuth();

    if(!token){
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}