import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard"; // Import Dashboard component
import Signup from "../Signup/SingnupPage";
import "./loginpage.css";
function togglePassword(event) {
  const passwordField = document.getElementById("password");
  if (passwordField) {
    // Add this check
    if (passwordField.type === "password") {
      passwordField.type = "text";
      event.target.className = "toggle-password uil-eye";
    } else {
      passwordField.type = "password";
      event.target.className = "toggle-password uil-eye-slash";
    }
  }
}

//State for an Id;

const Loginpage = () => {
  const [userId, setUserId] = useState(0);
  const [Page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const toggleForm = () => {
    setPage(Page === "login" ? "signup" : "login");
  };

  const changecolor = (event) => {
    if (event.target.type === "email") {
      const emailIcon = document.querySelector(".uil");
      if (emailIcon) {
        setTimeout(() => {
          emailIcon.style.color = "white";
        }, 5000);
        emailIcon.style.color = "lightseagreen";
      }
    } else if (event.target.type === "password") {
      const lockIcon = document.getElementById("lock");
      if (lockIcon) {
        setTimeout(() => {
          lockIcon.style.color = "white";
        }, 5000);
        lockIcon.style.color = "lightseagreen";
      }
    }
  };

  const validate = (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const getPersonData = async () => {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      setUserId(data.id);
      if (data.id === undefined) alert("InValid UserName And Email");
      setIsLoggedIn(true);
    };
    getPersonData();
  };

  if (isLoggedIn && userId !== undefined) {
    return <Dashboard userid={userId} />;
  }

  // Render login or signup form based on the current page state
  return Page === "login" ? (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-lightblue-400 to-lightgreen-300 text-white">
      <div className="container p-8 bg-white bg-opacity-80 rounded-xl shadow-xl w-96">
        <h2 className="text-center text-3xl mb-5 text-teal-700">Login</h2>
        <button className="w-16 h-1 bg-teal-400 mb-6 block mx-auto"></button>
        <form id="login-form">
          <div className="relative mb-6">
            <i className="uil uil-envelope absolute top-1/2 left-3 transform -translate-y-1/2 text-teal-600 text-xl"></i>
            <label htmlFor="email" className="block text-lg mb-2 text-teal-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-transparent border-b-2 border-teal-600 text-teal-700 text-lg focus:outline-none"
              onInput={changecolor}
              defaultValue={"aru701567@gmail.com"}
              required
            />
          </div>

          <div className="relative mb-6">
            <i
              id="lock"
              className="uil uil-lock absolute top-1/2 left-3 transform -translate-y-1/2 text-teal-600 text-xl"
            ></i>
            <label
              htmlFor="password"
              className="block text-lg mb-2 text-teal-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full p-3 bg-transparent border-b-2 border-teal-600 text-teal-700 text-lg focus:outline-none"
                onChange={changecolor}
                defaultValue={"Arunda95!"}
                required
              />
              <span
                className="toggle-password absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-teal-600"
                onClick={togglePassword}
              ></span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-200"
              onClick={validate}
              style={{ backgroundColor: "transparent", color: "#3b82f6" }}
            >
              Login
            </button>
            <button
              type="reset"
              className="bg-teal-200 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-300 transition duration-200"
            >
              Reset
            </button>
          </div>
        </form>
        <div className="text-center">
          <a
            href="#"
            className="text-teal-500 underline"
            onClick={toggleForm}
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                margin: "0px",
                fontSize: "1em",
                color: "blue",
                position: "relative",
                marginLeft: "55px",
                textDecoration: "none",
              }}
            >
              Not registered ?
            </span>
            <span
              style={{
                margin: "0px",
                fontSize: "1em",
                color: "green",
                position: "relative",
                marginLeft: "170px",
                marginTop: "-25px",
                textDecoration: "underline",
              }}
            >
              Register here
            </span>
          </a>
        </div>
      </div>
    </div>
  ) : (
    <Signup />
  );
};

export { Loginpage };
