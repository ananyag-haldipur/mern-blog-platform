import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        title: "",

        content: "",

        category: "General"

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await API.post(

                "/posts",

                form

            );

            alert("Post published successfully 🎉");

            navigate("/");

        }
        catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed to create post"

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

                                <h2 className="fw-bold text-success">

                                    ✍️ Create New Post

                                </h2>

                                <p className="text-muted">

                                    Share your knowledge with everyone

                                </p>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">

                                        Post Title

                                    </label>

                                    <input

                                        type="text"

                                        name="title"

                                        className="form-control"

                                        placeholder="Enter your post title"

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

                                        placeholder="Write your blog content here..."

                                        value={form.content}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="d-grid">

                                    <button

                                        type="submit"

                                        className="btn btn-success btn-lg"

                                        disabled={loading}

                                    >

                                        {

                                            loading

                                                ? "Publishing..."

                                                : "🚀 Publish Post"

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

export default CreatePost;