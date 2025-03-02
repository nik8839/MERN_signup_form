import React, { useState } from "react";
import axios from "axios";

import { FaUser, FaEnvelope, FaLock, FaVenusMars } from "react-icons/fa";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const userData = { email, name, gender, password };
    console.log("Sending Data:", userData);
   // console.log("Backend URL:", meta.env.VITE_BACKEND_URL);


    try {
      const response = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,  // Check if this matches your backend route
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      console.log("Response Data:", response.data);

      setSuccess("Account created successfully!");
      setTimeout(() => setSuccess(""), 5000);

      setEmail("");
      setName("");
      setGender("");
      setPassword("");
    } catch (err) {
      console.error("Error Response:", err.response);
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Sign Up
        </h1>

        {error && (
          <p className="text-red-600 text-center bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-center bg-green-100 p-2 rounded-md">
            {success}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <FaVenusMars className="absolute left-4 top-3 text-gray-500" />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-all duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
