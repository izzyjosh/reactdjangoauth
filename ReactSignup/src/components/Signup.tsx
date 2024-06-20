import useForm from "./UseForm";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const formData = {
    username: "",
    email: "",
    password: ""
  };

  const [fields, handleChange] = useForm(formData);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      });
      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.username);
        error.status = response.status;
        setData(errorData.username);
        throw error;
      }
      const jsonData = await response.json();
      setData("signup complete");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="signup">
      <div className="head">
        <h3>welcome, </h3>
        <p>create a new account </p>
      </div>
      <p>{data}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
        />
        {loading && <button disabled>Signing Up...</button>}
        {!loading && <button>Sign Up</button>}
        <p>
          Already have an account ? <Link to="/">Signin</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
