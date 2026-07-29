import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold fs-4"
                    to="/"
                >
                    📝 Blog Platform
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                🏠 Home
                            </NavLink>

                        </li>

                        {

                            user &&

                            <>

                                <li className="nav-item">

                                    <NavLink
                                        to="/create"
                                        className="nav-link"
                                    >
                                        ➕ Create Post
                                    </NavLink>

                                </li>

                                <li className="nav-item">

                                    <NavLink
                                        to="/profile"
                                        className="nav-link"
                                    >
                                        👤 Profile
                                    </NavLink>

                                </li>

                            </>

                        }

                    </ul>

                    <ul className="navbar-nav align-items-center">

                        {

                            user ?

                            <>

                                <li className="nav-item me-3">

                                    <span className="badge bg-primary fs-6 px-3 py-2">

                                        👋 {user.name}

                                    </span>

                                </li>

                                <li className="nav-item">

                                    <button
                                        className="btn btn-danger rounded-pill px-4"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>

                                </li>

                            </>

                            :

                            <>

                                <li className="nav-item me-2">

                                    <Link
                                        className="btn btn-outline-light rounded-pill px-4"
                                        to="/login"
                                    >
                                        Login
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link
                                        className="btn btn-warning rounded-pill px-4"
                                        to="/register"
                                    >
                                        Register
                                    </Link>

                                </li>

                            </>

                        }

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;