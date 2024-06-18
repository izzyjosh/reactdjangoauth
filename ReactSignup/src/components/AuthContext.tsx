import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
import Signin from "./Signing";
import Signup from "./Signup";

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );

  const [user, setUser] = useState(
    localStorage.getItem("authToken")
      ? jwtDecode(JSON.parse(localStorage.getItem("authToken")).access)
      : null
  );

  const [loading, setLoading] = useState(true);

  const loginUser = async fields => {
    e.preventDefault();
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
      const data = await response.json();
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      redirect("/");
    } catch (error) {
      setError(error);
    }
  };

  const registerUser = async fields => {
    e.preventDefault();
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
      redirect("/login");
      setData("signup complete");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    redirect("/login");
  };

  const contextData = {
    user,
    setUser,
    authToken,
    setAuthToken,
    loginUser,
    registerUser,
    logoutUser
  };

  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken.access));
    }
    setLoading(false);
  }, [authToken, loading]);

  return (
    <>
      <Signup />
      <Signin data="hello" />
    </>
  );
}
