import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const context = useContext(NoteContext);
    const { getUser } = context;

    const [name, setName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (localStorage.getItem("token")) {
                try {
                    const user = await getUser();
                    setName(user?.name || "");
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };

        fetchUserData();
    }, [getUser]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link className="navbarbrand" to="/">
                Car Management
            </Link>
            <ul>
                {localStorage.getItem("token") ? (
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                        <span>{name}</span>
                    </li>
                ) : (
                    <li>
                        {location.pathname === "/signup" ? (
                            <Link to="/login">Login</Link>
                        ) : (
                            <Link to="/signup">SignUp</Link>
                        )}
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
