import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetchMyPosts();

    }, []);

    const fetchMyPosts = async () => {

        try {

            const response = await API.get(
                "/posts/my/posts"
            );

            setPosts(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const deletePost = async (id) => {

        if (!window.confirm("Delete this post?"))
            return;

        try {

            await API.delete(`/posts/${id}`);

            fetchMyPosts();

        }
        catch (error) {

            alert(
                error.response?.data?.message ||
                "Delete failed"
            );

        }

    };

    return (

        <div className="container py-5">

            {/* Profile Card */}

            <div className="card shadow border-0 rounded-4 mb-5">

                <div className="card-body text-center">

                    <div
                        className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center mb-3"
                        style={{
                            width: "90px",
                            height: "90px",
                            fontSize: "40px"
                        }}
                    >
                        👤
                    </div>

                    <h2 className="fw-bold">

                        {user?.name}

                    </h2>

                    <p className="text-muted">

                        {user?.email}

                    </p>

                    <span className="badge bg-success fs-6">

                        {posts.length} Posts

                    </span>

                </div>

            </div>

            {/* My Posts */}

            <h2 className="fw-bold mb-4">

                📝 My Posts

            </h2>

            {

                posts.length === 0 ?

                    (

                        <div className="alert alert-warning text-center">

                            <h5>No posts created yet 😔</h5>

                        </div>

                    )

                    :

                    posts.map(post => (

                        <div
                            key={post._id}
                            className="card shadow-sm border-0 rounded-4 mb-4 blog-card"
                        >

                            <div className="card-body">

                                <h3 className="fw-bold text-primary">

                                    {post.title}

                                </h3>

                                <p className="text-secondary">

                                    {

                                        post.content.length > 150

                                            ? post.content.substring(0, 150) + "..."

                                            : post.content

                                    }

                                </p>

                                <span className="badge bg-primary bg-gradient rounded-pill px-3 py-2 mb-3">

                                    {post.category || "General"}

                                </span>

                                <hr />

                                <div className="d-flex justify-content-between align-items-center flex-wrap">

                                    <div>

                                        <small className="text-muted">

                                            📅 {new Date(post.createdAt).toLocaleDateString()}

                                        </small>

                                    </div>

                                    <div>

                                        <Link
                                            to={`/post/${post._id}`}
                                            className="btn btn-outline-primary rounded-pill me-2"
                                        >
                                            👁 View
                                        </Link>

                                        <Link
                                            to={`/edit/${post._id}`}
                                            className="btn btn-warning rounded-pill me-2"
                                        >
                                            ✏ Edit
                                        </Link>

                                        <button
                                            className="btn btn-danger rounded-pill"
                                            onClick={() => deletePost(post._id)}
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

            }

            <footer className="text-center text-muted mt-5">

                <hr />

                © 2026 Blog Platform • My Profile ❤️

            </footer>

        </div>

    );

}

export default Profile;