import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({

        title: "",

        content: "",

        category: "General"

    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchPost();

    }, [id]);

    const fetchPost = async () => {

        try {

            const response = await API.get(`/posts/${id}`);

            setForm({

                title: response.data.title,

                content: response.data.content,

                category: response.data.category || "General"

            });

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const updatePost = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await API.put(

                `/posts/${id}`,

                form

            );

            alert("Post updated successfully 🎉");

            navigate(`/post/${id}`);

        }
        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update post"

            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body p-5">

                            <div className="text-center mb-4">

                                <h2 className="fw-bold text-warning">

                                    ✏️ Edit Post

                                </h2>

                                <p className="text-muted">

                                    Update your blog post

                                </p>

                            </div>

                            <form onSubmit={updatePost}>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Post Title

                                    </label>

                                    <input

                                        type="text"

                                        name="title"

                                        className="form-control"

                                        placeholder="Enter post title"

                                        value={form.title}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Category

                                    </label>

                                    <select

                                        name="category"

                                        className="form-select"

                                        value={form.category}

                                        onChange={handleChange}

                                    >

                                        <option value="General">

                                            General

                                        </option>

                                        <option value="Technology">

                                            Technology

                                        </option>

                                        <option value="Programming">

                                            Programming

                                        </option>

                                        <option value="Education">

                                            Education

                                        </option>

                                    </select>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Content

                                    </label>

                                    <textarea

                                        name="content"

                                        rows="8"

                                        className="form-control"

                                        placeholder="Update your blog content..."

                                        value={form.content}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="d-grid">

                                    <button

                                        type="submit"

                                        className="btn btn-warning btn-lg"

                                        disabled={loading}

                                    >

                                        {

                                            loading

                                                ? "Updating..."

                                                : "💾 Update Post"

                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditPost;