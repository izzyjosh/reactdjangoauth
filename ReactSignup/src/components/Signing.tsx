import useForm from "./UseForm";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function Signin() {
  const formData = {
    username: "",
    password: ""
  };

  const [fields, handleChange] = useForm(formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }
      const jsonData = await response.json();
      setLoading(false);
      console.log(jsonData);
    } catch (error) {
      setError(error);
      setLoading(false);
      alert("incorrect password or username")
    }
  };

  return (
    <div className="signup">
      <Outlet />
      <div className="head">
        <h3>welcome, </h3>
        <p>sign in to your account </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={fields.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
        />
        {loading && <button disabled>Logging in...</button>}
        {!loading && <button>Sign Up</button>}
        <p>
          Don't have an account ? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
