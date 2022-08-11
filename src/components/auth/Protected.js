import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ isLogin, children }) => {
    if (!isLogin) {
        return <Navigate to='/user/login' replace></Navigate>

    }
    return children;

}

export default ProtectedRoute;