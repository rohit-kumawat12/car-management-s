import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    let navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }

    },[navigate]);

    if(!localStorage.getItem('token')){
        return null;
    }

    return(
        <>

        </>
    );
}

export default Profile;