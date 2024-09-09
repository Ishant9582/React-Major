import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Protected({ children, authentication = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    
    useEffect(() => {
        const isAuthenticated = authStatus === true;
        const redirectTo = location.state?.from?.pathname || "/";
        
        if (authentication && !isAuthenticated) {
            toast.error("please login first to perform this action")
            navigate("/login", { state: { from: location } });
        } else if (!authentication && isAuthenticated) {
            navigate(redirectTo);
        } else {
            setLoading(false);
        }
    }, [authStatus, navigate, authentication, location]);

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}


