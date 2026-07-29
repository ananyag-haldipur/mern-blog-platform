import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchPosts();
    }, [search]);

    const fetchPosts = async () => {
        try {
            const response = await API.get(`/posts?search=${search}`);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredPosts =
        category === "All"
            ? posts
            : posts.filter((post) => post.category === category);

    const categories = [
        "All",
        "Technology",
        "Programming",
        "General",
    ];

    return (
        <div className="container-xl py-5">

            {/* Hero Section */}

            <div className="hero-section text-center text-white rounded-4 shadow-lg p-5 mb-5">

                <h1 className="display-3 fw-bold">
                    🚀 Welcome to Blog Platform
                </h1>

                <p className="lead mt-3">
                    Share your knowledge, inspire others and become a better developer.
                </p>

                <Link
                    to="/create"
                    className="btn btn-light btn-lg rounded-pill mt-3 px-4"
                >
                    ✍ Start Writing
                </Link>

            </div>

            {/* Statistics */}

            <div className="row text-center mb-5">

                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <h2 className="fw-bold text-primary">
                                {posts.length}
                            </h2>
                            <p className="text-muted mb-0">
                                Total Blogs
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <h2 className="fw-bold text-danger">
                                {posts.reduce(
                                    (sum, post) => sum + (post.likeCount || 0),
                                    0
                                )}
                            </h2>
                            <p className="text-muted mb-0">
                                Total Likes
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <h2 className="fw-bold text-success">
                                {posts.reduce(
                                    (sum, post) => sum + (post.commentCount || 0),
                                    0
                                )}
                            </h2>
                            <p className="text-muted mb-0">
                                Comments
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <h2 className="fw-bold text-warning">
                                MERN
                            </h2>
                            <p className="text-muted mb-0">
                                Full Stack Project
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Create Button */}

            <div className="d-flex justify-content-end mb-4">

                <Link
                    to="/create"
                    className="btn btn-success rounded-pill px-4"
                >
                    ➕ Create Post
                </Link>

            </div>

            {/* Search */}

            <div className="input-group mb-4">

                <input
                    type="text"
                    className="form-control rounded-start-pill"
                    placeholder="🔍 Search blogs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="btn btn-primary rounded-end-pill px-4"
                    onClick={fetchPosts}
                >
                    Search
                </button>

            </div>

            {/* Categories */}

            <div className="mb-4">

                {categories.map((cat) => (

                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={
                            category === cat
                                ? "btn btn-dark rounded-pill me-2 mb-2"
                                : "btn btn-outline-dark rounded-pill me-2 mb-2"
                        }
                    >
                        {cat}
                    </button>

                ))}

            </div>

            {/* Posts */}

            {filteredPosts.length === 0 ? (

                <div className="alert alert-warning text-center rounded-4">
                    <h5>📭 No posts found</h5>
                </div>

            ) : (

                filteredPosts.map((post, index) => (

                    <div
                        key={post._id}
                        className="card shadow border-0 rounded-4 mb-4 blog-card"
                    >

                        <div className="card-body p-4">
                            <img
                              src={`https://picsum.photos/900/350?random=${index + 1}`}
                              className="card-img-top"
                              alt="Blog"
                              style={{
                              height: "230px",
                              objectFit: "cover"
                            }}
/>
                            <h3 className="fw-bold text-primary mb-3">
                                {post.title}
                            </h3>

                            <p className="text-secondary">

                                {post.content.length > 150
                                    ? post.content.substring(0, 150) + "..."
                                    : post.content}

                            </p>

                            <span className="badge bg-primary rounded-pill px-3 py-2">

                                {post.category}

                            </span>

                            <hr />

                            <div className="d-flex justify-content-between flex-wrap">

                                <div>

                                    <p className="text-muted mb-1">

                                        👤 {post.author?.name || "Unknown"}

                                    </p>

                                    <small className="text-muted">

                                        📅 {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}

                                    </small>

                                </div>

                                <div className="text-end">

                                    <p className="mb-1">

                                        ❤️ <strong>{post.likeCount || 0}</strong>

                                    </p>

                                    <p>

                                        💬 <strong>{post.commentCount || 0}</strong>

                                    </p>

                                </div>

                            </div>

                            <div className="text-end mt-4">

                                <Link
                                    to={`/post/${post._id}`}
                                    className="btn btn-success rounded-pill px-4"
                                >
                                    Read More →
                                </Link>

                            </div>

                        </div>

                    </div>

                ))

            )}

            {/* Footer */}

            <footer className="bg-dark text-white rounded-4 mt-5 p-4">

                <div className="text-center">

                    <h5>
                        📝 Blog Platform
                    </h5>

                    <p className="mb-2">
                        Share • Learn • Inspire
                    </p>

                    <hr />

                    <small>
                        © 2026 Blog Platform | Built with MERN Stack ❤️
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default Home;