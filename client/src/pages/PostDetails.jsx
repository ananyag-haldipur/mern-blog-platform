import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function PostDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchPost();
        fetchComments();

    }, [id]);

    const fetchPost = async () => {

        try {

            const response = await API.get(`/posts/${id}`);

            setPost(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const fetchComments = async () => {

        try {

            const response = await API.get(`/comments/${id}`);

            setComments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addComment = async (e) => {

        e.preventDefault();

        if (!text.trim()) {

            alert("Comment cannot be empty");
            return;

        }

        try {

            await API.post(`/comments/${id}`, {

                text

            });

            setText("");

            fetchComments();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login required"
            );

        }

    };

    const deleteComment = async (commentId) => {

        if (!window.confirm("Delete comment?"))
            return;

        try {

            await API.delete(`/comments/${commentId}`);

            fetchComments();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete"
            );

        }

    };

    const deletePost = async () => {

        if (!window.confirm("Delete post?"))
            return;

        try {

            await API.delete(`/posts/${id}`);

            alert("Post deleted");

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete"
            );

        }

    };

    const likePost = async () => {

        try {

            await API.put(`/posts/${id}/like`);

            fetchPost();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to like post"
            );

        }

    };

    if (loading) {

        return <h2 className="text-center mt-5">Loading...</h2>;

    }

    if (!post) {

        return <h2 className="text-center mt-5">Post not found</h2>;

    }

    const likedByUser =
        post.likes?.some(
            like => like.toString() === user?.id
        );

    return (

        <div className="container mt-5">

            <Link
                to="/"
                className="btn btn-outline-secondary mb-4"
            >
                ← Back to Blogs
            </Link>

            <div className="card shadow border-0 rounded-4">

                <div className="card-body p-5">

                    <span className="badge bg-primary fs-6 mb-3">

                        {post.category || "General"}

                    </span>

                    <h1 className="display-5 fw-bold">

                        {post.title}

                    </h1>

                    <p className="text-muted">

                        👤 {post.author?.name}

                    </p>

                    <p className="text-muted">

                        📅 {new Date(post.createdAt).toLocaleDateString()}

                    </p>

                    <hr />

                    <p
                        className="fs-5"
                        style={{
                            lineHeight: "1.9"
                        }}
                    >

                        {post.content}

                    </p>

                    <hr />

                    <div className="d-flex align-items-center gap-3 mb-4">

                        <button
                            className={
                                likedByUser
                                    ? "btn btn-danger"
                                    : "btn btn-outline-danger"
                            }
                            onClick={likePost}
                        >

                            {
                                likedByUser
                                    ? "❤️ Unlike"
                                    : "🤍 Like"
                            }

                        </button>

                        <h5 className="mb-0">

                            ❤️ {post.likes?.length || 0} Likes

                        </h5>

                    </div>

                    {

                        user &&
                        post.author?._id === user.id &&

                        <div className="mb-3">

                            <Link
                                to={`/edit/${post._id}`}
                                className="btn btn-warning me-2"
                            >

                                Edit

                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={deletePost}
                            >

                                Delete

                            </button>

                        </div>

                    }

                </div>

            </div>

            <div className="mt-5">

                <h2 className="mb-4">

                    💬 Comments

                </h2>

                <form onSubmit={addComment}>

                    <textarea
                        className="form-control mb-3"
                        rows="4"
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) =>
                            setText(e.target.value)
                        }
                    />

                    <button
                        className="btn btn-success"
                    >

                        Add Comment

                    </button>

                </form>

                <hr className="my-4" />

                {

                    comments.length === 0 ?

                        (

                            <div className="alert alert-info">

                                No comments yet.

                            </div>

                        )

                        :

                        comments.map(comment => (

                            <div
                                key={comment._id}
                                className="card mb-3 shadow-sm"
                            >

                                <div className="card-body">

                                    <h6>

                                        👤 {comment.user?.name}

                                    </h6>

                                    <p>

                                        {comment.text}

                                    </p>

                                    {

                                        comment.createdAt &&

                                        <small className="text-muted">

                                            📅 {new Date(comment.createdAt).toLocaleDateString()}

                                        </small>

                                    }

                                    {

                                        user &&
                                        comment.user?._id === user.id &&

                                        <div className="mt-3">

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    deleteComment(comment._id)
                                                }
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    }

                                </div>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default PostDetails;